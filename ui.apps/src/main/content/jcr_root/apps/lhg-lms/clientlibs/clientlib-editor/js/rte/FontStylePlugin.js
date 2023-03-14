(function (CUI) {
  //'use strict';
  CTL.rte.plugins.FontStylePlugin = new Class({

    toString: 'FontStylePlugin',

    extend: CUI.rte.plugins.Plugin, 

    cachedStyles: null,


    stylesUI: null,


    getFeatures: function () {
      return ['fontstyles'];
    },

    reportStyles: function () {
      return [{
        'type': 'text',
        'styles': this.getStyles()
      }
      ];
    },

    getStyles: function () {
      var com = CUI.rte.Common;
      if (!this.cachedStyles) {
        this.cachedStyles = this.config.styles;
        if (this.cachedStyles) {
          // take styles from config
          com.removeJcrData(this.cachedStyles);
          this.cachedStyles = com.toArray(this.cachedStyles, 'cssName', 'text');
        } else {
          this.cachedStyles = [];
        }
      }
      return this.cachedStyles;
    },

    setStyles: function (styles) {
      this.cachedStyles = styles;
    },

    hasStylesConfigured: function () {
      return !!this.config.styles;
    },

    initializeUI: function (tbGenerator, options) {
      var plg = CUI.rte.plugins;
      if (this.isFeatureEnabled('fontstyles')) { 
        this.stylesUI = new tbGenerator.createCTLStyleSelector('fontstyles', this, null,
          this.getStyles());
        tbGenerator.addElement('fontstyles', plg.Plugin.SORT_STYLES, this.stylesUI, 10);
      }
    },

    notifyPluginConfig: function (pluginConfig) {
      pluginConfig = pluginConfig || {};
      CUI.rte.Utils.applyDefaults(pluginConfig, {});
      this.config = pluginConfig;
    },

    execute: function (cmdId, styleDef) {
      if (!this.stylesUI) {
        return;
      }
      var cmd = null;
      var tagName;
      var className; 
      switch (cmdId.toLowerCase()) { 
      case 'applystyle': 
        cmd = 'style';
        tagName = 'span';
        className = ((styleDef !== null && styleDef !== undefined) ? styleDef
          : this.stylesUI.getSelectedStyle()); 
        break;
      }
      if (cmd && tagName && className) { 
        this.editorKernel.relayCmd("fontcolors", {
          'tag': tagName,
          'attributes': {
            'class': className,
            'pluginId':'FontStylePlugin'
          }
        });
      }
    },

    updateState: function (selDef) { 
      if (!this.stylesUI) {
        return;
      }
      var com = CUI.rte.Common;
      var styles = selDef.startStyles;
      var actualStyles = [];
      var s;
      var styleableObject = selDef.selectedDom; 
      if (styleableObject) {
        if (!CUI.rte.Common.isTag(selDef.selectedDom,
            CUI.rte.plugins.StylesPlugin.STYLEABLE_OBJECTS)) {
          styleableObject = null;
        }
      }
      var stylesDef = this.getStyles();
      var styleCnt = stylesDef.length;
      if (styleableObject) {
        for (s = 0; s < styleCnt; s++) {
          var styleName = stylesDef[s].cssName;
          if (com.hasCSS(styleableObject, styleName)) {
            actualStyles.push({
              'className': styleName
            });
          }
        }
      } else {
        var checkCnt = styles.length; 
        for (var c = 0; c < checkCnt; c++) { 
          var styleToProcess = styles[c];
          for (s = 0; s < styleCnt; s++) {
            if (stylesDef[s].cssName === styleToProcess.className) {
              actualStyles.push(styleToProcess);
              break;
            }
          }
        }
      } 
      this.stylesUI.selectStyles(actualStyles, selDef);
    }

  });

  /**
   * Array with tag names that define objects (like images) that are styleable when selected
   * @private
   * @static
   * @final
   * @type String[]
   */
  CUI.rte.plugins.StylesPlugin.STYLEABLE_OBJECTS = [
    'img'
  ];


// register plugin
  CUI.rte.plugins.PluginRegistry.register('fontstyles', CTL.rte.plugins.FontStylePlugin);
}(window.CUI));

(function ($, CUI) {

  //'use strict';
  var ICONS = {

    // Popover triggers
    '#format': 'text',
    '#justify': 'textLeft',
    '#lists': 'textBulleted',
    '#styles': 'textStyle',
    '#paraformat': 'textParagraph',

     // Code for custom plugins font style , color and size
	'#fontstyles': 'text',
    '#fontcolors': 'textColor',
	'#fontsize': 'textSize',
      //End

    // Commands
    'format#bold': 'textBold',
    'format#italic': 'textItalic',
    'format#underline': 'textUnderline',
    'subsuperscript#subscript': 'textSubscript',
    'subsuperscript#superscript': 'textSuperscript',
    'edit#cut': 'cut',
    'edit#copy': 'copy',
    'edit#paste-default': 'paste',
    'edit#paste-plaintext': 'pasteText',
    'edit#paste-wordhtml': 'pasteHTML',
    'justify#justifyleft': 'textLeft',
    'justify#justifycenter': 'textCenter',
    'justify#justifyright': 'textRight',
    'lists#unordered': 'textBulleted',
    'lists#ordered': 'textNumbered',
    'lists#outdent': 'textIndentDecrease',
    'lists#indent': 'textIndentIncrease',
    'links#modifylink': 'link',
    'links#unlink': 'linkOff',
    'links#anchor': 'anchor',
    'table#table': 'table',
    'table#createoredit': 'table',
    'table#insertcolumn-before': 'tableColumnAddLeft',
    'table#insertcolumn-after': 'tableColumnAddRight',
    'table#removecolumn': 'tableColumnRemoveCenter',
    'table#insertrow-before': 'tableRowAddTop',
    'table#insertrow-after': 'tableRowAddBottom',
    'table#removerow': 'tableRowRemoveCenter',
    'table#mergecells-right': 'tableRowMerge',
    'table#mergecells-down': 'tableColumnMerge',
    'table#mergecells': 'tableMergeCells',
    'table#splitcell-horizontal': 'tableRowSplit',
    'table#splitcell-vertical': 'tableColumnSplit',
    'table#modifytableandcell': 'tableEdit',
    'table#selectrow': 'tableSelectRow',
    'table#selectcolumn': 'tableSelectColumn',
    'table#ensureparagraph': 'textParagraph',
    'table#removetable': 'delete',
    'table#exitTableEditing': 'close',
    'image#imageProps': 'image',
    'spellcheck#checktext': 'spellcheck',
    'undo#undo': 'undo',
    'undo#redo': 'redo',
    'findreplace#find': 'search',
    'findreplace#replace': 'findAndReplace',
    'generichtml#generichtml': 'code',
    'misctools#specialchars': 'star',
    'misctools#sourceedit': 'fileCode',
    'fullscreen#toggle': 'fullScreen',
    'fullscreen#start': 'fullScreen',
    'fullscreen#finish': 'fullScreenExit',
    'control#close': 'close',
    'control#save': 'check'
  };

  var CLASSES = {
    '#format': 'rte--multiSelect',
    '#justify': 'rte--singleSelect',
    'fullscreen#toggle': 'rte--modechanger',
    'fullscreen#start': 'rte--modechanger',
    'fullscreen#finish': 'rte--modechanger',
    'control#close': 'rte--modechanger',
    'control#save': 'rte--modechanger',
    'links#modifylink': 'rte--trigger',
    'links#anchor': 'rte--trigger',
    'findreplace#find': 'rte--trigger',
    'findreplace#replace': 'rte--trigger',
    'misctools#specialchars': 'rte--trigger'
  };

  CTL.rte.ui.CuiToolbarBuilder = new Class({

    toString: 'CTLCuiToolbarBuilder',

    extend: CUI.rte.ui.cui.CuiToolbarBuilder,

    $editable: null,

    uiSettings: undefined,

    additionalClasses: {},

    // Helpers -------------------------------------------------------------------------

    _getUISettings: function (options) {
      if (this.uiSettings) {
        return this.uiSettings;
      }
      if (options && options.uiSettings && options.uiSettings.cui) {
        this.uiSettings = options.uiSettings.cui;
      } else {
        this.uiSettings = $.extend(true, {}, CUI.rte.ui.cui.DEFAULT_UI_SETTINGS_EXT);
      }
      var tk = CUI.rte.ui.ToolkitRegistry.get('cui');
      var adapter = tk.getToolkitData(CUI.rte.ui.ToolkitDefs.CONFIG_ADAPTER);
      if (typeof adapter === 'function') {
        this.uiSettings = adapter(this.uiSettings, 'uiSettings', options.componentType);
      }
      return this.uiSettings;
    },

    _registerIcons: function (iconDefs) {
      if (!iconDefs) {
        return;
      }
      CUI.rte.Common.removeJcrData(iconDefs);
      for (var node in iconDefs) {
        if (iconDefs.hasOwnProperty(node)) {
          var icon = iconDefs[node];
          if (icon.command && icon.icon) {
            this.registerIcon(icon.command, icon.icon);
          }
        }
      }
    },

    registerIcon: function (commandRef, iconName) { 
      var iconClassPrefix = 'coral-Icon coral-Icon--';
      if (iconName.indexOf(iconClassPrefix) !== -1) {
          var iconNameStartIndex = iconName.indexOf(iconClassPrefix) + iconClassPrefix.length;
          iconName = iconName.substring(iconNameStartIndex);
          var iconNameEndIndex = iconName.indexOf(' ');
          if (iconNameEndIndex !== -1) {
            iconName = iconName.substring(0, iconNameEndIndex);
          }
      }
      ICONS[commandRef] = iconName;
    },

    _getIconForCommand: function (commandRef) {
      if (ICONS.hasOwnProperty(commandRef)) {
        return ICONS[commandRef];
      }
      return undefined;
    },

    _registerAllAdditionalClasses: function (clsDefs) {
      var com = CUI.rte.Common;
      if (!clsDefs) {
        return;
      }
      com.removeJcrData(clsDefs);
      for (var node in clsDefs) {
        if (clsDefs.hasOwnProperty(node)) {
          var clsDef = clsDefs[node];
          if (clsDef.command && !com.isNull(clsDef.classes)) {
            this.registerAdditionalClasses(clsDef.command, clsDef.classes);
          }
        }
      }
    },

    /**
     * @param {String} commandRef The command refence (#trigger for popup triggers;
     *        plugin#command for active RTE buttons
     * @param {String} cssClasses Additional CSS classes; space separated
     */
    registerAdditionalClasses: function (commandRef, cssClasses) { 
      CLASSES[commandRef] = cssClasses;
    },

    _getClassesForCommand: function (commandRef) {
      if (CLASSES.hasOwnProperty(commandRef)) {
        return CLASSES[commandRef];
      }
      if (this.additionalClasses && this.additionalClasses.hasOwnProperty(commandRef)) {
        return this.additionalClasses[commandRef];
      }
      return undefined;
    },

    _buildToolbar: function ($editable, elements, options) {

      var addClasses;
      var popoverDefs;
      var items = [];
      var poItems = [];
      var popoverItemTpl = Coral.templates.RichTextEditor['popover_item'];

      function getItem(id) {
        var itemCnt = items.length;
        for (var i = 0; i < itemCnt; i++) { 
          if (items[i].ref === id) {
            return items[i];
          }
        }
        return null;
      }

      var self = this;
      this.additionalClasses = options.additionalClasses;
      function createPopoverItem(poItemDef) {
        // toolbar-separators have been removed.
        // ignore '-' for backwards compatibility of configuration
        if (poItemDef !== '-') {
          // popover item
          var poItem = getItem(poItemDef);
          if (poItem) {
            var cmd = poItem.ref; 
            addClasses = self._getClassesForCommand(cmd);
            addClasses = (addClasses ? ' ' + addClasses : '');
            poItem.icon = poItem.icon || self._getIconForCommand(cmd);
            poItem.addClasses = addClasses;
            poItems.push(popoverItemTpl(poItem));
          }
        }
      }

      function createDynamicPopover(itemDef) {
        var defs = itemDef.split(':');
        if (defs.length >= 2) {
          var plugin = options.editorKernel.getPlugin(defs[0]);
          var propName = defs[1];
          var prop = plugin[propName];
          if (plugin && prop) {
            if (typeof prop === 'function') {
              prop = prop.call(plugin);
            }
            if (prop) {
              defs[2] = defs[2].replace('-', '_');
              var dynamicPoItem = Coral.templates.RichTextEditor[defs[2]](prop);
              poItems.push(dynamicPoItem);
            }
          }
        }
      }

      function featureEnabled(pluginId, feature) {
        var plugin = options.editorKernel.getPlugin(pluginId);
        var isEnabled;
        if (feature) {
          isEnabled = plugin.isFeatureEnabled(feature);
        } else {
          isEnabled = plugin.isAnyFeatureEnabled();
        }
        return isEnabled;
      }

      function popoverAvailable(popoverDef) {
        if (!popoverDefs) {
          return false;
        }
        var id = popoverDef.substring(1);
        if (popoverDefs.hasOwnProperty(id)) {
          var popoverItems = popoverDefs[id].items;
          if (popoverItems) {
            if ((typeof popoverItems === 'string') &&
              (popoverItems.indexOf(':') > 0)) {
              var def = popoverItems.split(':');
              if (featureEnabled(def[0])) {
                return true;
              }
            } else {
              for (var i = 0; i < popoverItems.length; i++) {
                var ref = popoverItems[i].split('#');
                if (featureEnabled(ref[0], ref[1])) {
                  return true;
                }
              }
            }
          }
        }
        return false;
      }

      var com = CUI.rte.Common;
      var uiSettings = this._getUISettings(options);

      for (var e = 0; e < elements.length; e++) {
        elements[e].addToToolbar(items);
      }
      // reorder according to settings
      com.removeJcrData(uiSettings);
      var toolbars = [];
      var toolbarTpl = Coral.templates.RichTextEditor['toolbar'];
      var itemTpl = Coral.templates.RichTextEditor['toolbar_item'];
      var triggerTpl = Coral.templates.RichTextEditor['popover_trigger'];
      var popoverTpl = Coral.templates.RichTextEditor['popover'];
      var popovercontentTpl = Coral.templates.RichTextEditor['popovercontent'];
      for (var tbId in uiSettings) {
        if (uiSettings.hasOwnProperty(tbId)) {
          var toolbar = uiSettings[tbId];
          var tbItems = [];
          var popovers = [];
          var itemDefs = toolbar.toolbar;
          if (!itemDefs) {
            continue;
          }
          popoverDefs = toolbar.popovers;

          // toolbar
          var itemCnt = itemDefs.length;
          for (var i = 0; i < itemCnt; i++) {
            var itemToAdd = itemDefs[i];
            if (itemToAdd && itemToAdd.length) {
              if (itemToAdd.charAt(0) === '#') {
                if (popoverAvailable(itemToAdd)) { 
                  // popover trigger
                  addClasses = this._getClassesForCommand(itemToAdd);
                  addClasses = (addClasses ? ' ' + addClasses : '');
                  var tooltip = itemToAdd.charAt(1).toUpperCase() + itemToAdd.substr(2);
                  tbItems.push(triggerTpl({
                    'ref': itemToAdd,
                    'icon': this._getIconForCommand(itemToAdd),
                    'addClasses': addClasses,
                   'tooltip': CUI.rte.Utils.i18n('' + tooltip),
                    'variant': 'quiet' // (tbId === 'inline' ? 'secondary' : 'quiet')
                  }));
                }
              } else if (itemToAdd !== '-') {
                // toolbar-separators have been removed.
                // ignore '-' for backwards compatibility of configuration
                // regular item
                var element = getItem(itemToAdd);
                if (element &&
                  featureEnabled(element.plugin, element.command)) {
                  addClasses = this._getClassesForCommand(itemToAdd);
                  addClasses = (addClasses ? ' ' + addClasses : '');
                  element.icon = element.icon ||
                    this._getIconForCommand(element.ref);
                  element.addClasses = addClasses;
                  if (addClasses.indexOf('rte--trigger') !== -1) {
                    element.trigger = true;
                  }
                  element.variant = 'quiet'; // (tbId === 'inline' ? 'secondary' : 'quiet');
                  tbItems.push(itemTpl(element));
                }
              }
            }
          }
          // popovers
          if (popoverDefs) {
            com.removeJcrData(popoverDefs);
            for (var p in popoverDefs) {
              if (popoverDefs.hasOwnProperty(p)) {
                poItems = [];
                var popoverToProcess = popoverDefs[p];
                var poItemDefs = popoverToProcess.items;
                var popover = popoverTpl({
                  'ref': popoverToProcess.ref
                });
                if (CUI.rte.Utils.isString(poItemDefs)) {
                  createDynamicPopover(poItemDefs);
                  popover.childNodes[0].content.appendChild(poItems[0]);
                } else {
                  var poItemCnt = poItemDefs.length;
                  for (var pi = 0; pi < poItemCnt; pi++) {
                    createPopoverItem(poItemDefs[pi]);
                  } 
                  popover.childNodes[0].content.appendChild(popovercontentTpl({'popoverItems': poItems}));
                }
                popovers.push(popover);
              }
            }
          } 
          // add representation
          toolbars.push({
            'id': tbId,
            'toolbar': toolbarTpl({
              'toolbarItems': tbItems
            }),
            'popovers': popovers
          });
        }
      }

      var $toolbar = $(Coral.templates.RichTextEditor['tb_container']({
        'toolbars': toolbars
      }));
      var $ui = CUI.rte.UIUtils.createOrGetUIContainer($editable);
      $ui.append($toolbar);
    },

    // Toolbar management --------------------------------------------------------------

    /**
     * Notify all elements to use the passed toolbar.
     * @param {CUI.rte.ui.Toolbar} toolbar The toolbar to use
     * @param {Boolean} skipHandlers true to skip attaching handlers to buttons
     */
    notifyToolbar: function (toolbar, skipHandlers) {
      var groupCnt = this.groups.length;
      for (var groupIndex = 0; groupIndex < groupCnt; groupIndex++) {
        var groupElements = this.groups[groupIndex].elements;
        var elCnt = groupElements.length;
        for (var elIndex = 0; elIndex < elCnt; elIndex++) {
          var element = groupElements[elIndex].def;
          var toolbarDef = element.createToolbarDef();
          if (toolbarDef !== null && toolbarDef !== undefined) {
            element.notifyToolbar(toolbar, skipHandlers);
          }
        }
      }
    },

    /**
     * Create the abstracted toolbar.
     * @return {CUI.rte.ui.Toolbar} The toolbar
     * @ignore
     */
    createToolbar: function (options) {
      var com = CUI.rte.Common;
      var toolbarItems = [];
      var elements = [];
      var elementMap = {};
      var groupCnt = this.groups.length;

      // create data model
      var hasMembers = false;
      for (var groupIndex = 0; groupIndex < groupCnt; groupIndex++) {
        var groupElements = this.groups[groupIndex].elements;
        var elCnt = groupElements.length;
        for (var elIndex = 0; elIndex < elCnt; elIndex++) {
          var element = groupElements[elIndex].def;
          if ((elIndex === 0) && hasMembers) {
            toolbarItems.push('-');
            hasMembers = false;
          }
          var toolbarDef = element.createToolbarDef();
          if (toolbarDef !== null && toolbarDef !== undefined) {
            if (!CUI.rte.Utils.isArray(toolbarDef)) {
              toolbarDef = [toolbarDef];
            }
            var itemCnt = toolbarDef.length;
            for (var i = 0; i < itemCnt; i++) {
              var def = toolbarDef[i];
              toolbarItems.push(def);
              elementMap[def.id] = def;
            }
            elements.push(element);
            hasMembers = true;
          }
        }
      }

      // register additional/override existing icons, if available
      var uiSettings = this._getUISettings(options);
      if (uiSettings && uiSettings.hasOwnProperty('icons')) {
        this._registerIcons(uiSettings['icons']);
        delete uiSettings['icons'];
      }
      if (uiSettings && uiSettings.hasOwnProperty('additionalClasses')) {
        this._registerAllAdditionalClasses(uiSettings['additionalClasses']);
        delete uiSettings['additionalClasses'];
      }

      // attach model to UI/create UI from model
      var $editable = options.$editable;
      var $toolbar = CUI.rte.UIUtils.getToolbar($editable, options.tbType);
      var elementCnt = elements.length;
      if (!$toolbar) {
        // create new toolbar if none is present yet
        this._buildToolbar($editable, elements, options);
      }

      // use existing/newly created toolbar
      var toolbar = new CUI.rte.ui.cui.ToolbarImpl(elementMap, $editable,
        options.tbType, options.isFullScreen || options.useFixedInlineToolbar || options.isSticky);
      for (var e = 0; e < elementCnt; e++) {
        elements[e].notifyToolbar(toolbar);
      }
      toolbar.createPopoverTriggerToElementMapping();

      // add marker class for touch/desktop usage
      var $ui = CUI.rte.UIUtils.createOrGetUIContainer($editable);
      if (com.ua.isTouch && !$ui.hasClass('is-touch')) {
        $ui.addClass('is-touch');
      }
      if (!com.ua.isTouch && !$ui.hasClass('is-desktop')) {
        $ui.addClass('is-desktop');
      }

      return toolbar;
    },


    // Creating elements -------------------------------------------------------------------


    createElement: function (id, plugin, toggle, tooltip, css, cmdDef) {
      return new CUI.rte.ui.cui.ElementImpl(id, plugin, toggle, tooltip, css,
        cmdDef);
    },

    createParaFormatter: function (id, plugin, tooltip, formats) {
      return new CUI.rte.ui.cui.ParaFormatterImpl(id, plugin, false, tooltip, false,
        undefined, formats);
    },  

   // Code for custom plugins font style , color and size
    createCTLStyleSelector: function(id, plugin, tooltip, styles) {  
        return new CTL.rte.ui.StyleSelectorImpl(id, plugin, false, tooltip, false,
                                                    undefined, styles); 
    },
      //End
      createStyleSelector: function (id, plugin, tooltip, styles) { 
      return new CUI.rte.ui.cui.StyleSelectorImpl(id, plugin, false, tooltip, false,
        undefined, styles);
    }
  });

  CUI.rte.ui.cui.DEFAULT_UI_SETTINGS_EXT = {
    'inline': {
      // TODO adjust to final decision of default inline toolbar settings
      'toolbar': [
        '#format',
        '#justify',
        '#lists',
        'links#modifylink',
        'links#unlink',
        'table#createoredit',
        'fullscreen#start',
        'control#close',
        'control#save'
      ],
      'popovers': {
        'format': {
          'ref': 'format',
          'items': [
            'format#bold',
            'format#italic',
            'format#underline'
          ]
        },
        'justify': {
          'ref': 'justify',
          'items': [
            'justify#justifyleft',
            'justify#justifycenter',
            'justify#justifyright'
          ]
        },
        'lists': {
          'ref': 'lists',
          'items': [
            'lists#unordered',
            'lists#ordered',
            'lists#outdent',
            'lists#indent'
          ]
        },
        'styles': {
          'ref': 'styles',
          'items': 'styles:getStyles:styles-pulldown'
        },
        'paraformat': {
          'ref': 'paraformat',
          'items': 'paraformat:getFormats:paraformat-pulldown'
        },
        // Code for custom plugins font style , color and size
        'fontstyles': {
            'ref': 'fontstyles',
            'items': 'fontstyles:getStyles:styles-pulldown'
          },
          'fontcolors': {
            'ref': 'fontcolors',
            'items': 'fontcolors:getStyles:fontcolors-pulldown'
          },
          'fontsize': {
            'ref': 'fontsize',
            'items': 'fontsize:getStyles:fontsize-pulldown'
          }
        //End
      }
    },
    'fullscreen': {
      'toolbar': [
        'format#bold',
        'format#italic',
        'format#underline',
        'subsuperscript#subscript',
        'subsuperscript#superscript',
        'edit#cut',
        'edit#copy',
        'edit#paste-default',
        'edit#paste-plaintext',
        'edit#paste-wordhtml',
        'links#modifylink',
        'links#unlink',
        'links#anchor',
        'findreplace#find',
        'findreplace#replace',
        'undo#undo',
        'undo#redo',
        'justify#justifyleft',
        'justify#justifycenter',
        'justify#justifyright',
        'lists#unordered',
        'lists#ordered',
        'lists#outdent',
        'lists#indent',
        'table#createoredit',
        'image#imageProps',
        'spellcheck#checktext',
        'generichtml#generichtml',
        'misctools#specialchars',
        'misctools#sourceedit',
        '#styles',
        // Code for custom plugins font style , color and size
        '#fontstyles',
        '#fontcolors',
		'#fontsize',
		
        //End
        '#paraformat',
        'fullscreen#finish'
      ],
      'popovers': {
        'styles': {
          'ref': 'styles',
          'items': 'styles:getStyles:styles-pulldown'
        },
        'paraformat': {
          'ref': 'paraformat',
          'items': 'paraformat:getFormats:paraformat-pulldown'
        },

         // Code for custom plugins font style , color and size
        'fontstyles': {
            'ref': 'fontstyles',
            'items': 'fontstyles:getStyles:fontstyles-pulldown'
          },
          'fontcolors': {
            'ref': 'fontcolors',
            'items': 'fontcolors:getStyles:fontcolors-pulldown'
          },
          'fontsize': {
            'ref': 'fontsize',
            'items': 'fontsize:getStyles:fontsize-pulldown'
          }
         //End
      }
    },
    'tableEditOptions': {
      'toolbar': [
        'table#insertcolumn-before',
        'table#insertcolumn-after',
        'table#removecolumn',
        'table#insertrow-before',
        'table#insertrow-after',
        'table#removerow',
        'table#mergecells-right',
        'table#mergecells-down',
        'table#mergecells',
        'table#splitcell-horizontal',
        'table#splitcell-vertical',
        'table#selectrow',
        'table#selectcolumn',
        'table#ensureparagraph',
        'table#modifytableandcell',
        'table#removetable',
        'undo#undo',
        'undo#redo',
        'table#exitTableEditing'
      ]
    }
  };

    // Code for custom plugins font style , color and size

  window["Coral"]["templates"]["RichTextEditor"]["fontstyles_pulldown"] = (function anonymous(data_0
  /**/) {
    var frag = document.createDocumentFragment();
    var data = data_0;
    var el0 = document.createElement("coral-buttonlist");
    el0.className += " rte-toolbar-list";
    var el1 = document.createTextNode("\r\n");
    el0.appendChild(el1);
    var iterated_1 = data_0;
    for (var i1 = 0, ni1 = iterated_1.length; i1 < ni1; i1++) {
      var data_1 = data = iterated_1[i1];
      var el3 = document.createTextNode("\r\n  ");
      el0.appendChild(el3);
      var el4 = document.createElement("button","coral-buttonlist-item");
      el4.setAttribute("is", "coral-buttonlist-item");
      el4.setAttribute("data-action", "fontstyles#"+data_1["cssName"]);
      var el5 = document.createElement("coral-list-item-content");
      el5.textContent = data_1["text"];
      el4.appendChild(el5);
      el0.appendChild(el4);
      var el6 = document.createTextNode("\r\n");
      el0.appendChild(el6);
    }
    var el7 = document.createTextNode("\r\n");
    el0.appendChild(el7);
    frag.appendChild(el0);
    var el8 = document.createTextNode("\r\n");
    frag.appendChild(el8);
    return frag;
  });

  window["Coral"]["templates"]["RichTextEditor"]["fontcolors_pulldown"] = (function anonymous(data_0
  /**/) {
    var frag = document.createDocumentFragment();
    var data = data_0;
    var el0 = document.createElement("coral-buttonlist");
    el0.className += " rte-toolbar-list";
    var el1 = document.createTextNode("\r\n");
    el0.appendChild(el1);
    var iterated_1 = data_0;
    for (var i1 = 0, ni1 = iterated_1.length; i1 < ni1; i1++) {
      var data_1 = data = iterated_1[i1];
      var el3 = document.createTextNode("\r\n  ");
      el0.appendChild(el3);
      var el4 = document.createElement("button","coral-buttonlist-item");
      el4.setAttribute("is", "coral-buttonlist-item"); 
      el4.setAttribute("data-action", "fontcolors#"+data_1["cssName"]);
      //var el5 = document.createElement("coral-list-item-content");   
        var el5 = document.createElement("list-item");   
      el5.textContent = data_1["text"];  
      el4.appendChild(el5);  
      var div = document.createElement("span"); 
      div.style.width = "20px";
      div.style.height = "20px"; 
      div.style.backgroundColor=data_1["bgrdcolor"];
      div.style.float="right"; 
      div.style.borderRadius = "5px"
      el4.appendChild(div); 
      el0.appendChild(el4);
      var el6 = document.createTextNode("\r\n");
      el0.appendChild(el6);  
    }
    var el7 = document.createTextNode("\r\n");
    el0.appendChild(el7);
      el0.style.width="180px";
    frag.appendChild(el0);
    var el8 = document.createTextNode("\r\n");
    frag.appendChild(el8); 
    return frag;
  });
  window["Coral"]["templates"]["RichTextEditor"]["fontsize_pulldown"] = (function anonymous(data_0
  /**/) {
    var frag = document.createDocumentFragment();
    var data = data_0;
    var el0 = document.createElement("coral-buttonlist");
    el0.className += " rte-toolbar-list";
    var el1 = document.createTextNode("\r\n");
    el0.appendChild(el1);
    var iterated_1 = data_0;
    for (var i1 = 0, ni1 = iterated_1.length; i1 < ni1; i1++) {
      var data_1 = data = iterated_1[i1];
      var el3 = document.createTextNode("\r\n  ");
      el0.appendChild(el3);
      var el4 = document.createElement("button","coral-buttonlist-item");
      el4.setAttribute("is", "coral-buttonlist-item");
      el4.setAttribute("data-action", "fontsize#"+data_1["cssName"]);
      var el5 = document.createElement("coral-list-item-content");
      el5.textContent = data_1["text"];
      el4.appendChild(el5);
      el0.appendChild(el4);
      var el6 = document.createTextNode("\r\n");
      el0.appendChild(el6);
    }
    var el7 = document.createTextNode("\r\n");
    el0.appendChild(el7);
    frag.appendChild(el0);
    var el8 = document.createTextNode("\r\n");
    frag.appendChild(el8);
    return frag;
  });
  //End

})(window.jQuery, window.CUI);
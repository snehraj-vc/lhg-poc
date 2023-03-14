/*************************************************************************
* Extend the toolkit implementation for custom toolbar builder and dialog manager
**************************************************************************/
CTL.rte.ui.ToolkitImpl = new Class({

    toString: "CTLToolkitImpl",

    extend: CUI.rte.ui.cui.ToolkitImpl,

    createToolbarBuilder: function() {
        return new CTL.rte.ui.CuiToolbarBuilder();
    }
});

CUI.rte.ui.ToolkitRegistry.register("cui", CTL.rte.ui.ToolkitImpl);
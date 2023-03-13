
var CTL = CTL || {};
CTL.rte = CTL.rte || {
    GROUP: "ctl",

    // Commands
    COMMAND: { 
        COLORS:"fontcolors",
		FONT: "fontcommand"
	},

    DEBUG: {
        ALL: false,
        STYLESELECTOR: false,
        TOOLKITIMPL: false,
        TOOLBARBUILDER: false,
        STYLECOMMAND: false,
        FONTSTYLE: false
    }, 

    STYLE_TAG: "span",

    STYLEABLE_OBJECTS: [
    	"img"
	]
};
CTL.rte.commands = {};
CTL.rte.plugins = {};
CTL.rte.ui = {};
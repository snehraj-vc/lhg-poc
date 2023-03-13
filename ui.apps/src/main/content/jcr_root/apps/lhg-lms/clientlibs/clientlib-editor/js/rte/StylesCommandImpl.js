/*************************************************************************
* Styles Command manager for fontstyles plugin
**************************************************************************/
CTL.rte.commands.StylesCommandImpl = new Class({

    toString: "CTLStylesCommand",

    extend: CUI.rte.commands.Command,

    isCommand: function(cmdStr) { 
        return  (cmdStr.toLowerCase() == CTL.rte.COMMAND.COLORS ||
				 cmdStr.toLowerCase() == CTL.rte.COMMAND.STYLES);
    },

    getProcessingOptions: function() {
        var cmd = CUI.rte.commands.Command;
        return cmd.PO_SELECTION | cmd.PO_BOOKMARK | cmd.PO_NODELIST;
    },

    addStyle: function(execDef) {    
        var sel = CUI.rte.Selection; 
        var com = CUI.rte.Common; 
        var styleName = execDef.value.attributes.class; 
        var tagName = execDef.value.tag; 
        var styleList = execDef.value.styles; 
        var selection = execDef.selection; 
        var context = execDef.editContext; 
        // handle DOM elements
        var selectedDom = sel.getSelectedDom(context, selection); 
        var styleableObjects = CTL.rte.STYLEABLE_OBJECTS; 
        if (selectedDom && com.isTag(selectedDom, styleableObjects)) {
            com.removeAllClasses(selectedDom);
            com.addClass(selectedDom, styleName);
            return;
        }
        // handle text fragments
        var nodeList = execDef.nodeList;
        if (nodeList) {  
            if(selection.startNode.parentNode.tagName == "SPAN" && 
               selection.startNode.parentNode.getAttribute("data-pluginid")!=null) {  
                var newStyles = [];  
				var existingStyles = selection.startNode.parentNode.className.split(" ");
                if(styleList!=null){
                    for(var i=0; i<existingStyles.length;i++) {
                        var status = true;
                        for(var j=0; j<styleList.length; j++) {
                            if(existingStyles[i] == styleList[j].cssName) {
                                status = false;
                            }
                        }
                        if(status) {
                            newStyles.push(existingStyles[i]);
                        }
                    }
                } 

                if("default" != styleName) {
                    newStyles.push(styleName);
                }

                if(newStyles.length == 0) {
                     
                    $(selection.startNode).unwrap();
                } else { 
                       
                    if(selection.startNode.parentNode.className==newStyles.join(" ")){
                        var removeStyle="";
                         nodeList.removeNodesByTag(execDef.editContext, tagName, {"data-pluginid":execDef.value.attributes.pluginId}, true);
                         this.applyLIElementStyle(nodeList,removeStyle,execDef);
                    }else if(selection.startNode.parentNode.parentNode.className==newStyles.join(" ")){
                         
						 nodeList.removeNodesByTag(execDef.editContext, tagName, {"data-pluginid":execDef.value.attributes.pluginId}, true);
                         this.applyLIElementStyle(nodeList,removeStyle,execDef);

                    }else if(selection.startNode.parentNode.parentNode.parentNode.className==newStyles.join(" ")){
                         
                         nodeList.removeNodesByTag(execDef.editContext, tagName, {"data-pluginid":execDef.value.attributes.pluginId}, true);
                         this.applyLIElementStyle(nodeList,removeStyle,execDef);

                    }else{
                        nodeList.removeNodesByTag(execDef.editContext, tagName, {"data-pluginid":execDef.value.attributes.pluginId}, true);
						nodeList.commonAncestor = nodeList.nodes[0].dom.parentNode;
                        if(styleName != "default") { 
                    	nodeList.surround(execDef.editContext, tagName, {
                        "className": styleName,
                        "data-pluginid":execDef.value.attributes.pluginId
                    	});							
                        
						this.applyLIElementStyle(nodeList,styleName,execDef);						
                        }
					 }
                }
            } else{                  
                var parents = [];
                var found=false;
                var elem=selection.startNode; 

               while(elem.parentNode && 
                      elem.parentNode.nodeName.toLowerCase() != 'p' &&
                      elem.parentNode.nodeName.toLowerCase() != 'li' &&
                      elem.parentNode.nodeName.toLowerCase() != 'div') {
                    elem = elem.parentNode;
                    if(elem!=null){
                        if(elem.nodeName.toLowerCase()=='span' && 
                           elem.getAttribute("data-pluginid")!=null && 
                           elem.getAttribute("data-pluginid")==execDef.value.attributes.pluginId){
                            found=true;
                            break;
                        } 
                    }
                }
                if(found){
                    if(elem.className==styleName){    
                        elem.outerHTML = elem.innerHTML; 
                    }else{ 
                    	elem.className = styleName; 
                    }
                }

                if(styleName != "default") { 
                    nodeList.removeNodesByTag(execDef.editContext, tagName, {"data-pluginid":execDef.value.attributes.pluginId}, true);
                    nodeList.surround(execDef.editContext, tagName, {
                        "className": styleName,
                        "data-pluginid":execDef.value.attributes.pluginId
                    });
                     
                    this.applyLIElementStyle(nodeList,styleName,execDef);

                }
            }
        }
    },

    execute: function(execDef) {   
        switch (execDef.command.toLowerCase()) {
            case "fontcolors" || "fontsize" || "fontstyles":
                this.addStyle(execDef);
                break;
        }
    },

    queryState: function(selectionDef, cmd) { 
        var com = CUI.rte.Common;
        var tagName = this._getTagNameForCommand(cmd);
        if (!tagName) {
            return undefined;
        }
        var context = selectionDef.editContext;
        var selection = selectionDef.selection;
        return (com.getTagInPath(context, selection.startNode, tagName) != null);
    },

    applyLIElementStyle: function(nodeList,styleName,execDef){
           for (var i = 0; i < nodeList.nodes.length; i++) {                   

                     var newlistStyles = [];  
					 newlistStyles.push(styleName);
					 var element=nodeList.nodes[i].dom;               		
                     var sibelement;
                    if(element.nodeName.toLowerCase() == 'span'){
                         sibelement=this.getSiblingElement(element,sibelement);
                         this.getLIElementStyles(sibelement,styleName,newlistStyles,execDef);

                    }else if(element.nodeName.toLowerCase() == 'ol'){
                      var olChildNodes=element.childNodes;                        
                         for (var j = 0; j < olChildNodes.length; j++) {
                             if(olChildNodes[j].nodeName.toLowerCase() == 'li'){                                 
                                  sibelement=olChildNodes[j];
                         		this.getLIElementStyles(sibelement,styleName,newlistStyles,execDef);
                             }
                         }

                    }else if(element.nodeName.toLowerCase() == '#text'){                    
						 sibelement=this.getSiblingElement(element,sibelement);
                         this.getLIElementStyles(sibelement,styleName,newlistStyles,execDef);
                    }else if(element.nodeName.toLowerCase() == 'li'){ 
                          sibelement=element;
						 this.getLIElementStyles(element,styleName,newlistStyles,execDef);                      
                        var liChildNodes=element.childNodes;                        
                         for (var k = 0; k < liChildNodes.length; k++) {                            
                             if(liChildNodes[k].nodeName.toLowerCase() == 'ol'){                               
                                 var olChildNodes=liChildNodes[k].childNodes;                       			
                        		 for (var l = 0; l < olChildNodes.length; l++) {                                    
                             	  if(olChildNodes[l].nodeName.toLowerCase() == 'li'){
                                  sibelement=olChildNodes[l];
                         		this.getLIElementStyles(sibelement,styleName,newlistStyles,execDef);
                            		 }
                         		}                          

                             }
                         }
                    }
                }
    },

    getSiblingElement: function(element,sibelement){

         			if(element.parentNode.nodeName.toLowerCase()=='li'){
                            sibelement=element.parentNode;
                        }else if(element.parentNode.parentNode.nodeName.toLowerCase()=='li'){
							sibelement=element.parentNode.parentNode;
                        }else if(element.parentNode.parentNode.parentNode.nodeName.toLowerCase()=='li'){
							sibelement=element.parentNode.parentNode.parentNode;
                        }

        return sibelement;

    },

    getLIElementStyles: function(element,styleName,newlistStyles,execDef){

       					 if(element){
	
						if(element.className){                         

         				var existingStyles = element.className.split(" ");                             

                         for(var j=0; j<existingStyles.length;j++) {
                            
                        	var status = true;
                             if("FontColorsPlugin"==execDef.value.attributes.pluginId){
                                 	if(existingStyles[j].startsWith("font")){
									newlistStyles.push(existingStyles[j]);
                             		}else if(existingStyles[j].startsWith("font-family") || existingStyles[j].startsWith("font-style")){
                                    newlistStyles.push(existingStyles[j]);
                             		}
                                 
                             }else if("FontSizePlugin"==execDef.value.attributes.pluginId){
                                 if(!existingStyles[j].startsWith("font")){
									newlistStyles.push(existingStyles[j]);
                                 }else if(existingStyles[j].startsWith("font-family") || existingStyles[j].startsWith("font-style")){
									newlistStyles.push(existingStyles[j]);
                                 }
                                 
                             }else if("FontStylePlugin"==execDef.value.attributes.pluginId){
								if(!(existingStyles[j].startsWith("font-family") || existingStyles[j].startsWith("font-style"))){
									newlistStyles.push(existingStyles[j]);
                             		}                                
                             }
                    	}
					}	
						
						 element.className =  newlistStyles.join(" ");
                 }
    }
});  
CUI.rte.commands.CommandRegistry.register(CTL.rte.COMMAND.COLORS, CTL.rte.commands.StylesCommandImpl);
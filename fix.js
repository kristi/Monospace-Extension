function fixArray(array) {
    if(!array) return;
    for(var j=0; j<array.length; j++) {
        var element=array[j];
        if(!element || !element.style) continue;
        // Check font-family style
        if(element.style.fontFamily && 
            /^monospace[; ]*$/i.test(element.style.fontFamily)) {
            element.style.setProperty("font-family","monospace,monospace",null);
            //console.log(element.style.cssText);
        }
        // Check font style
        // Assume that a comma means more than one font-family
        // was specified.
        if(element.style.font &&
            /monospace/i.test(element.style.font) &&
            !/,/.test(element.style.font)) {
            var text = element.style.font.replace(/monospace/i, "monospace,monospace");
            element.style.setProperty("font",text,null);
            //console.log(element.style.cssText);
        }
    }
}
function fixStylesheets() {
    if (!document.styleSheets) {
        console.log("no styleSheets");
        return null;
    }
    
    for(var i=0; i<document.styleSheets.length; i++) {
        var stylesheet = document.styleSheets[i];
        fixArray(stylesheet.cssRules);
    }
}
function fixInlineStyles(){
    fixArray(document.getElementsByTagName("div"));
    fixArray(document.getElementsByTagName("span"));
    fixArray(document.getElementsByTagName("p"));
    fixArray(document.getElementsByTagName("pre"));
}
function fixMonospace() {
    fixStylesheets();
    fixInlineStyles();
}
fixMonospace();
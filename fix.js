function fixArray(array) {
    var fontFamilyRegex=/^monospace$/i;
    var fontRegex=/monospace/i;
    for(var j=0; j<array.length; j++) {
        var element=array[j];
        // Check font-family style
        if(fontFamilyRegex.test(element.style.fontFamily)) {
            element.style.setProperty("font-family","monospace,monospace",null);
        }
        // Check font style
        // Assume that a comma means more than one font-family
        // was specified.
        if(/monospace/i.test(element.style.font) &&
            !/,/.test(element.style.font)) {
            var text = element.style.font.replace(/monospace/i, "monospace,monospace");
            element.style.setProperty("font",text,null);
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
}
function fixMonospace() {
    fixStylesheets();
    fixInlineStyles();
}
fixMonospace();
var initSample = (function() {
    return function(domId, tinggi) {
        CKEDITOR.replace(domId, {
            extraPlugins: 'ckeditor_wiris,mathjax,pastebase64,imageku,imageresizerowandcolumn,justify',
            mathJaxLib: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML',
            height: tinggi
        });
    };
})();
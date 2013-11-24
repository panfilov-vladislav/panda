(function(require){
    var panda = window.panda = window.panda || {}; panda;
    require.forEach(function(src) {
    setTimeout(
        function() {
            var script = document.createElement('script');
            script.src = src;
            script.async = false;
            document.head.appendChild(script);
        }, 0);
    });
}).call({},// all dependencies
[
    'libs/controller.js'
]);




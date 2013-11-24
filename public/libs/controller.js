

window.panda.controller = (function(){
    var socket = io.connect('https://localhost:3001');
    socket.on('connect', function () { socket.emit('auth', 'authentication token') });


})();


//var socket = io.connect('https://localhost:3001');
//socket.on('news', function (data) {
//    console.log(data);
//    socket.emit('my other event', { my: 'data' });
//});
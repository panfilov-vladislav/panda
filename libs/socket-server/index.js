"use strict";

var fs = require('fs');
var http = require('http');
var https = require('https');
var socketIO = require('socket.io');

var DEFAULT_OPTIONS = {
    host: '127.0.0.1',
    port: 3001,
    //staticPath: __dirname + '/public',
    https: {
        cert: __dirname + '/ssl/ssl.pem',
        key:  __dirname + '/ssl/ssl.key'
    }
};

var isInitialized = false;

function use(extModules){ extModules;
    if (isInitialized) return exports;
    return exports;
}
function init(options){

    if (isInitialized) return exports;

    options = options || {};
    options.host = options.host || DEFAULT_OPTIONS.host;
    options.port = options.port || DEFAULT_OPTIONS.port;
    options.https = options.https || DEFAULT_OPTIONS.https;

    //expressApp.use(function(req,res){res.writeHead(200);res.end('200');});

    //exports.express = express;
    //exports.expressApp = expressApp;
    var server;
    try{
        var key = fs.readFileSync(options.https.key);
        var cert = fs.readFileSync(options.https.cert);
        server = https.createServer({key: key, cert: cert});
    }
    catch(e){
        console.log('socket server failed to start using ssl');
        console.error(e);
        server = http.createServer();
    }

    exports.socketIO = socketIO = socketIO.listen(server);
    server.listen(options.port, options.host);

    socketIO.on('connection', function(socket){
        socket.on('event', function(data){});
        socket.on('disconnect', function(){});
    });

    isInitialized = true;

    return exports;

}


exports.use = function(extModules){ return use(extModules) };
exports.init = function(options){ return init(options) };

if (!module.parent) init();


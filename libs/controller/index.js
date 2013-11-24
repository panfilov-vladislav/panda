"use strict";

var DEFAULT_OPTIONS = {};

var socketIO;
var isInitialized = false;

function use(extModules){
    if (isInitialized) return exports;

    extModules = extModules || {};
    socketIO = extModules.socketIO;

    return exports;
}
function init(options){

    if (isInitialized) return exports;
    if (undefined == socketIO) return exports;

    options = options || {};

    socketIO.on('connection', onConnection);

    isInitialized = true;

    return exports;

}
function onConnection(socket){
    socket.on('auth', function(data){
        console.log(data);
    });
    socket.on('disconnect', function(){});
}


exports.use = function(extModules){ return use(extModules) };
exports.init = function(options){ return init(options) };

if (!module.parent) init();


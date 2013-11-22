"use strict";
var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');


var DEFAULT_OPTIONS = {
    host: '127.0.0.1',
    port: 3000,
    staticPath: __dirname + '/public',
    https: {
        cert: __dirname + '/ssl/flyfish-20120604.pem',
        key:  __dirname + '/ssl/flyfish-20120604.key'
    }
};

console.log('Current directory: ' + process.cwd());
var expressApp = express();
var isInitialized = false;

function use(extModules){ extModules;
    if (isInitialized) return exports;
    return exports
}
function init(options){

    if (isInitialized) return exports;

    options = options || {};
    options.host = options.host || DEFAULT_OPTIONS.host;
    options.port = options.port || DEFAULT_OPTIONS.port;
    options.staticPath = options.staticPath || DEFAULT_OPTIONS.staticPath;
    options.https = options.https || DEFAULT_OPTIONS.https;


    expressApp.configure(function(){
        expressApp.use(express.compress());
        expressApp.use(express.static(options.staticPath || DEFAULT_OPTIONS.staticPath));
        expressApp.use(function(req,res){
            res.writeHead(404);
            res.end('404');
        });
    });

    //expressApp.use(function(req,res){res.writeHead(200);res.end('200');});

    exports.express = express;
    exports.expressApp = expressApp;

    if (options.https){
        try{
            var key = fs.readFileSync(options.https.key);
            var cert = fs.readFileSync(options.https.cert);
            https.createServer({key: key, cert: cert}, expressApp).listen(options.port);
        }
        catch(e){
            console.error(e);
            process.exit(1);
        }
    }
    else {
        http.createServer(expressApp).listen(options.port);
    }

    isInitialized = true;

    return exports;

}


exports.use = function(extModules){ return use(extModules) };
exports.init = function(options){ return init(options) };

if (!module.parent) init();




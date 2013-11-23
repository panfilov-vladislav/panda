
var pandaHttpServer = require('./libs/http-server').use().init({port:3000, staticPath: __dirname + '/public'}); pandaHttpServer;
var pandaSocketServer = require('./libs/socket-server').use().init({port:3001}); pandaSocketServer;

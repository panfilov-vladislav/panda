var derby = require('derby');
var racerBrowserChannel = require('racer-browserchannel');

var app = require('../app');
var error = require('./error');

//Derby store configuration
var mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/project';
var liveDbMongo = require('livedb-mongo')(mongoUrl + '?auto_reconnect', {safe: true});
var store = derby.createStore({db: {db: liveDbMongo, redis: require('redis').createClient()} });

//Derby auth configuration
var auth = require('derby-passport');
var strategies = {
    yandex: {
        strategy: require("passport-yandex").Strategy,
        conf: {
            clientID: '01a5abf2fbd54b96ad5a72cf490561e6',
            clientSecret: '80004e8f06284a50bdee370967bcccf5',
            callbackURL: 'http://wan.panfilov.me:3000/auth/yandex/callback'
        }
    }
};
auth.store(store, liveDbMongo.mongo, strategies);

function createUserId(req, res, next) {
    var model = req.getModel();
    var userId = req.session.userId || (req.session.userId = model.id());
    model.set('_session.userId', userId);
    next();
}

//Express initialization
var express = require('express');
var MongoStore = require('connect-mongo')(express);
var expressApp = module.exports = express();
//Express configuration
expressApp
    .use(express.favicon())
    //.use(express.logger())
    // Gzip dynamically
    .use(express.compress())
    // Respond to requests for application script bundles
    .use(app.scripts(store))
    // Serve static files from the public directory
    // .use(express.static(__dirname + '/../../public'))

    // Add browserchannel client-side scripts to model bundles created by store,
    // and return middleware for responding to remote client messages
    .use(racerBrowserChannel(store))
    // Add req.getModel() method
    .use(store.modelMiddleware())

    // Parse form data
    .use(express.bodyParser())
    .use(express.methodOverride())

    // Session middleware
    .use(express.cookieParser())
    .use(express.session({
        secret: process.env.SESSION_SECRET || 'YOUR SECRET HERE', store: new MongoStore({url: mongoUrl, safe: true})
    }))
    //.use(createUserId)

    // Initialize Passport!  Also use passport.session() middleware, to support
    // persistent login sessions (recommended).
    .use(auth.middleware(strategies, {}))
    // Create an express middleware from the app's routes
    .use(app.router())
    .use(expressApp.router)
    .use(error());

console.log(expressApp.router);


// SERVER-SIDE ROUTES //

expressApp.all('*', function (req, res, next) {
    next('404: ' + req.url);
});

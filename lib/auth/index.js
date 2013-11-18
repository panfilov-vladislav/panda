var derby = require('derby');

var path = require('path');
var derby = require('derby');

var expressApp = require("express")();

var staticPages = derby.createStatic(path.dirname(path.dirname(__dirname)));



module.exports = function() {
    return expressApp.get('/login[\/]?', function(req, res, next) {
        staticPages.render('auth', res);
    });
};





/**
 * Previous version used #depby-passport & #passport-yandex as a strategy
 * Works fine, but it isn't what I need now
 */
/*
var passport = require('derby-passport');
var strategies = {
    yandex: {
        strategy: require("passport-yandex").Strategy,
        conf: {
              clientID: '01a5abf2fbd54b96ad5a72cf490561e6'
            , clientSecret: '80004e8f06284a50bdee370967bcccf5'
            , callbackURL: 'http://wan.panfilov.me:3000/auth/yandex/callback'
        }
    }
};

derby.on('store', function(store){
    passport.store(store, store.shareClient.options.db.db.mongo, strategies);
});

module.exports = function() {
    //var staticPages = derby.createStatic(path.dirname(path.dirname(__dirname)));
    return passport.middleware(strategies, {});
};
*/
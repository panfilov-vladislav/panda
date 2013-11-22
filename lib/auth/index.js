
var derby = require('derby');
var app = derby.createApp(module);
app.use(require("derby-ui-boot"))
   .use(require("../../components/ui/"))
   .use(require("../../components/auth/"));

app.get("/", function(page, model){
    var $user = model.at("auths."+model.get("_session.userId"));
    $user.subscribe(function(err){
       if (err) throw err;
        model.ref("_page.user", $user);
        page.render();
    });
});

app.ready(function(model){

});

/*
var derby = require('derby');
var path = require('path');

var expressApp = require("express")();

var staticPages = derby.createStatic(path.dirname(path.dirname(__dirname)));



module.exports = function() {
    return expressApp.get('/login[\/]?', function(req, res, next) {
        staticPages.render('auth', res);
    });
};
*/





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

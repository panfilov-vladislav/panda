var derby = require('derby');
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

//Derby auth configuration

/*
auth.get('*',function(page,model,params,next){
    //if (model.get('_session.loggedIn')) return next();
    //page.redirect('/auth/yandex/');
    next();
});

auth.get('/', function(page, model) {

    page.render();

    //var $user = model.at('auths.'+model.get('_session.userId'));
    //$user.subscribe(function(err){
    //    if (err) throw err;
    //    model.ref('_page.user', $user);
    //    page.render();
    //    //console.log($user);
    //});
});
*/

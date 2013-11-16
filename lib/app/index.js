var app = require('derby').createApp(module)
  .use(require('../../ui'))



app.get('*',function(page,model,params,next){
    //if (model.get('_session.loggedIn')) return next();
    //page.redirect('/auth/yandex/');
    next();
});

app.get('/', function(page, model) {

    page.render();

    //var $user = model.at('auths.'+model.get('_session.userId'));
    //$user.subscribe(function(err){
    //    if (err) throw err;
    //    model.ref('_page.user', $user);
    //    page.render();
    //    //console.log($user);
    //});
});

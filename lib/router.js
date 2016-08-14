FlowRouter.route('/login', {
    name: 'login',
    action: function() {
        BlazeLayout.render('appBody', {main: 'login'});
    }
});

FlowRouter.route('/', {
    name: 'individualPage',
    action: function() {
        BlazeLayout.render('appBody', {main: 'individualPage'});
    }
});

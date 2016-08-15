FlowRouter.route('/login', {
    name: 'login',
    action: function() {
        BlazeLayout.render('appBody', {main: 'login'});
    }
});

FlowRouter.route('/', {
    name: 'welcome',
    action: function() {
        BlazeLayout.render('appBody', {main: 'Welcome'});
    }
});

FlowRouter.route('/:taskId/individual', {
    name: 'individualPage',
    action: function() {
        BlazeLayout.render('appBody', {main: 'individualPage'});
    }
});

FlowRouter.route('/:taskId/group', {
    name: 'groupPage',
    action: function() {
        BlazeLayout.render('appBody', {main: 'GroupPage'});
    }
});

FlowRouter.route('/admin', {
    name: 'admin',
    action: function() {
        BlazeLayout.render('appBody', {main: 'Admin'});
    }
});

FlowRouter.route('/:taskId', {
    name: 'taskInstructions',
    action: function() {
        BlazeLayout.render('appBody', {main: 'TaskInstructions'})
    }
})

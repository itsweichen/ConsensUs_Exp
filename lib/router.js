FlowRouter.route('/', {
    name: 'welcome',
    action: function() {
        BlazeLayout.render('appBody', {main: 'Welcome'});
    }
});

FlowRouter.route('/question', {
    name: 'questions',
    action: function() {
        BlazeLayout.render('appBody', {main: 'Questions'})
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action: function() {
        BlazeLayout.render('appBody', {main: 'login'});
    }
});

FlowRouter.route('/admin', {
    name: 'admin',
    action: function() {
        BlazeLayout.render('appBody', {main: 'Admin', nav: 'AdminHeader'});
    }
});

FlowRouter.route('/admin', {
    name: 'admin',
    action: function() {
        BlazeLayout.render('appBody', {main: 'Admin', nav: 'AdminHeader'});
    }
});

FlowRouter.route('/admin/voters', {
    name: 'admin-voters',
    action: function() {
        BlazeLayout.render('appBody', {main: 'AdminVoters', nav: 'AdminHeader'});
    }
});

FlowRouter.route('/admin/results', {
    name: 'admin-results',
    action: function() {
        BlazeLayout.render('appBody', {main: 'AdminResults', nav: 'AdminHeader'});
    }
});

FlowRouter.route('/:taskId', {
    name: 'taskInstructions',
    action: function() {
        BlazeLayout.render('appBody', {main: 'TaskInstructions'})
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

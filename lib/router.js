FlowRouter.route('/nonvis', {
    name: 'nonvis',
    action: function() {
        BlazeLayout.render('appBody', {main: 'NonVis', footer: 'Footer' });
    }
});


FlowRouter.route('/', {
    name: 'welcome',
    action: function() {
        BlazeLayout.render('appBody', {main: 'Welcome', footer: 'Footer'});
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action: function() {
        BlazeLayout.render('appBody', {main: 'login', footer: 'Footer' });
    }
});

FlowRouter.route('/questions', {
    name: 'questions',
    action: function() {
        BlazeLayout.render('appBody', {main: 'Questions', footer: 'Footer' })
    }
});

FlowRouter.route('/confidence', {
    name: 'confidence',
    action: function() {
        BlazeLayout.render('appBody', {main: 'ConfidenceSurvey', footer: 'Footer' })
    }
});

FlowRouter.route('/unauth', {
    name: 'unauth',
    action: function() {
        BlazeLayout.render('appBody', {main: 'AdminUnauth', footer: 'Footer' });
    }
});

var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'adminGroup',
  triggersEnter: [function(context, redirect) {
      if (!Meteor.user() || Meteor.user().username != "weichen") {
          redirect('/unauth');
      }
  }]
});

adminRoutes.route('/', {
    name: 'admin',
    action: function() {
        BlazeLayout.render('appBody', {main: 'Admin', nav: 'AdminHeader', footer: 'Footer' });
    }
});

adminRoutes.route('/tasks', {
    name: 'admin-voters',
    action: function() {
        BlazeLayout.render('appBody', {main: 'AdminTasks', nav: 'AdminHeader', footer: 'Footer' });
    }
});


adminRoutes.route('/voters', {
    name: 'admin-voters',
    action: function() {
        BlazeLayout.render('appBody', {main: 'AdminVoters', nav: 'AdminHeader', footer: 'Footer' });
    }
});

adminRoutes.route('/results', {
    name: 'admin-results',
    action: function() {
        BlazeLayout.render('appBody', {main: 'AdminResults', nav: 'AdminHeader', footer: 'Footer' });
    }
});

FlowRouter.route('/:taskId', {
    name: 'taskInstructions',
    action: function() {
        BlazeLayout.render('appBody', {main: 'TaskInstructions', footer: 'Footer'})
    }
});

FlowRouter.route('/:taskId/individual', {
    name: 'individualPage',
    action: function() {
        if (FlowRouter.getQueryParam("order") === '1') {
            BlazeLayout.render('appBody', {main: 'individualPage', nav:'TaskHeader', footer: 'Footer'});
        } else {
            BlazeLayout.render('appBody', {main: 'individualPage',footer: 'Footer'});
        }

    }
});

FlowRouter.route('/:taskId/confidence', {
    name: 'confidence',
    action: function() {
        BlazeLayout.render('appBody', {main: 'ConfidenceSurvey', nav:'TaskHeader', footer: 'Footer' });
    }
});

FlowRouter.route('/:taskId/group', {
    name: 'groupPage',
    action: function() {
        BlazeLayout.render('appBody', {main: 'GroupPageTemplate', nav:'TaskHeader', footer: 'Footer'});
    }
});

FlowRouter.route('/:taskId/done', {
    name: 'groupPage',
    action: function() {
        BlazeLayout.render('appBody', {main: 'TaskDone', nav:'TaskHeader', footer: 'Footer'});
    }
});

FlowRouter.route('/:taskId/secretsignin', {
    name: 'groupPage',
    action: function() {
        BlazeLayout.render('appBody', {main: 'UserSignIn', footer: 'Footer'});
    }
});

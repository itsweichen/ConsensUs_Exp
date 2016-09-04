// function startTuTimer(duration, display) {
//     var timer = duration, minutes, seconds;
//     var countdown = setInterval(function () {
//         minutes = parseInt(timer / 60, 10)
//         seconds = parseInt(timer % 60, 10);
//
//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;
//
//         display.textContent = minutes + ":" + seconds;
//
//         if (--timer < 0) {
//             timer = 0;
//             $('#time').css("color", "red");
//             $("#next-btn").disable(false);
//             clearInterval(countdown);
//         }
//     }, 1000);
// }
//
// Template.VisTutorial.events({
//     'click #next-btn': function() {
//         timerStart(2);
//         $('body, html').animate({ scrollTop: 0 }, 800);
//         FlowRouter.go('/' + FlowRouter.getParam("taskId") + '/group?type=1');
//     }
// });
//
// Template.VisTutorial.onRendered(function() {
//     var time = 60 * 2,
//         display = document.querySelector('#time');
//     if(devMode) {
//         time = 60 * 0.1;
//     }
//     startTuTimer(time, display);
// });
//
// Template.VisTutorial.helpers({
//     cond1_2: function() {
//         var taskId = FlowRouter.getParam("taskId");
//         var task = Tasks.findOne({_id: taskId});
//         return (task.condition === 1) || (task.condition === 2);
//     }
// });

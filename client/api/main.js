Meteor.autosubscribe(function (){
    Meteor.subscribe("Scores");
})


$.fn.triggerSVGEvent = function(eventName) {
    var event = document.createEvent('SVGEvents');
    event.initEvent(eventName,true,true);
    this[0].dispatchEvent(event);
    return $(this);
};

/*
 * .widthSVG(className)
 * Get the current computed width for the first element in the set of matched SVG elements.
 */

$.fn.widthSVG = function(){
    return ($(this).get(0)) ? $(this).get(0).getBBox().width : null;
};

/*
 * .heightSVG(className)
 * Get the current computed height for the first element in the set of matched SVG elements.
 */
$.fn.heightSVG = function(){
    return ($(this).get(0)) ? $(this).get(0).getBBox().height : null;
};

showCloseWalkthrough = true;

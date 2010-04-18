// http://jscompress.com/

// MARK_NODES_WITH_EVENTS
jQuery("*").filter(function(){
    return (jQuery(this).data("events"));
}).css("background-color", "gold").each(function(){
    jQuery(this).addClass("eventFinder_hasEvent");
});

// minified
jQuery("*").filter(function(){return(jQuery(this).data("events"));}).css("background-color","gold").each(function(){jQuery(this).addClass("eventFinder_hasEvent");});


// DISPLAY_EVENTS

jQuery("#eventFinder_eventList").remove(); 
var eventFinder_events="";
jQuery(".eventFinder_selected").each(function(){
    var dEvents=$(this).data("events");
    if(!dEvents){return;}
    for(var type in dEvents){
        jQuery.each(dEvents[type],function(key,handlerObj){
            eventFinder_events+=type+" - "+handlerObj.handler;
            })
    }
});
jQuery("<div>"+eventFinder_events+"</div>").attr("id","eventFinder_eventList").css({
    background: "#CCC",
    border: "2px solid #999",
    color: "#000", 
    "font-size":"15px", 
    "z-index":"2000",
    position:"absolute", 
    top:"100px", 
    left:"100px", 
    padding:"40px", 
    width:"700px",
    "-webkit-border-radius":"20px",
    "-moz-border-radius":"20px",
    "border-radius":"20px"
}).prependTo("body");



// minified

// var eventFinder_events="";jQuery(".eventFinder_selected").each(function(){var dEvents=$(this).data("events");if(!dEvents){return;}
// for(var type in dEvents){jQuery.each(dEvents[type],function(key,handlerObj){eventFinder_events+=type+" - "+handlerObj.handler+"\n";})}});


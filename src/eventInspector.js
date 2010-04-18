
var MARK_NODES_WITH_EVENTS = 'jQuery("*").filter(function(){return(jQuery(this).data("events"));}).each(function(){jQuery(this).addClass("eventFinder_hasEvent");});';
//function DISPLAY_EVENTS(top, left) { return 'jQuery("#eventFinder_eventList").remove();var eventFinder_events="jQuery "+jQuery().jquery+" events";jQuery(".eventFinder_selected").each(function(){var dEvents=$(this).data("events");if(!dEvents){return;}for(var type in dEvents){jQuery.each(dEvents[type],function(key,handlerObj){eventFinder_events+="&lt;p&gt;&lt;b&gt;"+type+"&lt;/b&gt; - "+(jQuery().jquery>="1.4.2"?handlerObj.handler:handlerObj)+"&lt;/p&gt;";});}});jQuery("&lt;div&gt;"+eventFinder_events+"&lt;/div&gt;").attr("id","eventFinder_eventList").css({background: "#CCE1E3",border: "3px solid #2E6E75", color: "#000", "font-size":"15px", "text-align":"left", "z-index":"2000",position:"absolute", top:"'+top+'px", left:"'+left+'px", padding:"40px", width:"700px","-webkit-border-radius":"20px","-moz-border-radius":"20px","border-radius":"20px"}).appendTo("body");jQuery("&lt;div&gt; x &lt;/div&gt;").attr("id","eventFinder_close").css({background:"#FFF", width:"30px", "text-align":"center", position:"absolute",right:"10px", top:"10px"}).prependTo("#eventFinder_eventList");jQuery("#eventFinder_close").click(function(){jQuery("#eventFinder_eventList").remove(); return false;})';}
function DISPLAY_EVENTS(top, left) { return 'jQuery("#eventFinder_popup").remove(); var eventFinder_events="";jQuery(".eventFinder_selected").each(function(){var dEvents=$(this).data("events");if(!dEvents){return;}for(var type in dEvents){jQuery.each(dEvents[type],function(key,handlerObj){eventFinder_events+="<p><b>"+type+"</b> - "+handlerObj.handler+"</p>";})}});jQuery("<div>"+eventFinder_events+"</div>").attr("id","eventFinder_popup").css({top:"'+top+'px", left:"'+left+'px"}).prependTo("body");';}

var MARKED_ELEMENTS_CSS = '.eventFinder_hasEvent {background-color: #FF00EE;}\n .eventFinder_hasEvent:hover {border: 2px solid #002FFF;}';
var POPUP_CSS = '#eventFinder_popup {background: #CCE1E3; border: 3px solid #2E6E75; color: #000; font-family:arial; font-size:15px; z-index:2000; position:absolute; top 60px; left:50px; padding:30px; width:700px;-webkit-border-radius:20px;-moz-border-radius:20px;border-radius:20px;}';



function injectScript(scr ,id) {
    var s = jQuery('<script id="' + id + '"></script>');
    s.html(scr);
    s.appendTo('head');
}

function injectCss(css) {
    jQuery('<style type="text/css"> '+css+' </style>').appendTo('head');
}


injectCss(MARKED_ELEMENTS_CSS);
injectCss(POPUP_CSS);

injectScript(MARK_NODES_WITH_EVENTS, 'eventFinder_mark');


jQuery('.eventFinder_hasEvent').click(function(event) {
    $('.eventFinder_selected').removeClass('eventFinder_selected');
    $(this).addClass('eventFinder_selected');
    $('#eventFinder_display').remove();
    injectScript(DISPLAY_EVENTS(event.pageY, 100), 'eventFinder_display');
    return false;
});

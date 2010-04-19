
var MARK_JQUERY_EVENTS = 'jQuery("*").filter(function(){return(jQuery(this).data("events"));}).each(function(){jQuery(this).addClass("eventFinder_jqEvent");});';
var MARK_JQUERY_LIVE_EVENTS = 'jQuery.each(jQuery(document).data("events").live, function() {jQuery(this.selector).addClass("eventFinder_jqLive"); });';

var DISPLAY_JQUERY_EVENTS = 'var eventFinder_events="";jQuery(".eventFinder_selected").each(function(){var dEvents=$(this).data("events");if(!dEvents){return;}for(var type in dEvents){jQuery.each(dEvents[type],function(key,handlerObj){eventFinder_events+="<p><b>"+type+"</b> - "+handlerObj.handler+"</p>";})}});';

function DISPLAY_EVENTS(top, left) { return 'jQuery("#eventFinder_popup").remove();    jQuery("<div>"+eventFinder_events+"</div>").attr("id","eventFinder_popup").css({top:"'+top+'px", left:"'+left+'px"}).prependTo("body");   jQuery("<div>x</div>").attr("id","eventFinder_close").prependTo("#eventFinder_popup");jQuery("#eventFinder_close").click(function(){jQuery("#eventFinder_popup").remove(); return false;})';}

var DISPLAY_JQUERY_LIVE_EVENTS = 'var eventFinder_events="";  jQuery.each(jQuery(document).data("events").live, function() {if(jQuery(".eventFinder_selected").is(this.selector)) { eventFinder_events += "<p><b>"+this.type + "." + this.origType + "</b> - " + this.origHandler+"</p>"; }});';

var MARKED_ELEMENTS_CSS =   '.eventFinder_jqEvent {background-color: #FF00EE;} ' + 
                            '.eventFinder_jqEvent:hover {border: 2px solid #002FFF;} ' +
                            '.eventFinder_jqLive {background-color: gold;}' +
                            '.eventFinder_jqLive:hover {border: 2px solid #002FFF;} ';
                            
                            
var POPUP_CSS = '#eventFinder_popup {background: #CCE1E3; border: 3px solid #2E6E75; color: #000; font-family:arial; font-size:15px; z-index:3000; position:absolute; padding:30px; -webkit-border-radius:20px;-moz-border-radius:20px;border-radius:20px;} ' +
                '#eventFinder_close {background:#FFF; width:30px; text-align:center; position:absolute; right:10px; top:10px; cursor:pointer;}';

var IS_MICROSOFT = navigator.userAgent.toLowerCase().indexOf('') !== -1;

function escapeHtml(str) {
    return str.replace(/</g, '&lt;').replace(/>/g,'&gt;');
}


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

injectScript(MARK_JQUERY_EVENTS, 'eventFinder_jqScript');
injectScript(MARK_JQUERY_LIVE_EVENTS, 'eventFinder_jqLiveScript');


function displayEvents(eventSelectorScript) {
    jQuery('.eventFinder_selected').removeClass('eventFinder_selected');
    jQuery(this).addClass('eventFinder_selected');
    jQuery('#eventFinder_displayScript').remove();
    injectScript(eventSelectorScript, 'eventFinder_selectScript');
    injectScript(DISPLAY_EVENTS(event.pageY, 100), 'eventFinder_displayScript');
    
}

jQuery('.eventFinder_jqEvent').click(function(event) {
    displayEvents.call(this, DISPLAY_JQUERY_EVENTS);
    return false;
});

jQuery('.eventFinder_jqLive').click(function(event) {
    displayEvents.call(this, DISPLAY_JQUERY_LIVE_EVENTS);
    return false;
});
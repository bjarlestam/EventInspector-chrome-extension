/* injection scripts */
var MARK_JQUERY_EVENTS = 'jQuery("*").filter(function(){return(jQuery(this).data("events"));}).each(function(){jQuery(this).addClass("eventFinder_jqEvent").css({background: "#FF00EE"});});';
var MARK_JQUERY_LIVE_EVENTS = 'jQuery.each(jQuery(document).data("events").live, function() {jQuery(this.selector).addClass("eventFinder_jqLive").css({background: "gold"}); });';
var MARK_DOM_EVENTS = 'var eventTypes = ["onclick", "onmouseover", "onmouseout"];   jQuery("*").each(function() { $this = jQuery(this); for(i in eventTypes) {if($this.attr(eventTypes[i])) {$this.addClass("eventFinder_xx" + eventTypes[i]).addClass("eventFinder_domEvent").css("background", "lightgreen");}}});';

function DISPLAY_EVENTS(top, left) { return 'jQuery("#eventFinder_popup").remove();    jQuery("<div>"+eventFinder_events+"</div>").attr("id","eventFinder_popup").css({top:"'+top+'px", left:"'+left+'px"}).prependTo("body");   jQuery("<div>x</div>").attr("id","eventFinder_close").prependTo("#eventFinder_popup");jQuery("#eventFinder_close").click(function(){jQuery("#eventFinder_popup").remove(); return false;})';}
var CLEAR_EVENTS = 'var eventFinder_events="";';
var DISPLAY_JQUERY_EVENTS = 'jQuery(".eventFinder_selected").each(function(){var dEvents=$(this).data("events");if(!dEvents){return;}for(var type in dEvents){jQuery.each(dEvents[type],function(key,handlerObj){eventFinder_events+="<p><b>jquery."+type+"</b> - "+handlerObj.handler+"</p>";})}});';
var DISPLAY_JQUERY_LIVE_EVENTS = 'jQuery.each(jQuery(document).data("events").live, function() {if(jQuery(".eventFinder_selected").is(this.selector)) { eventFinder_events += "<p><b>"+this.type + "." + this.origType + "</b> - " + this.origHandler+"</p>"; }});';
var DISPLAY_DOM_EVENTS = 'jQuery(".eventFinder_selected").each(function(){ var selected=jQuery(this); var classes = selected.attr("class").split(" "); for(i in classes) { if(classes[i].indexOf("eventFinder_xx") != -1) {var eventName = classes[i].slice(14, classes[i].length); var eventContent = selected.attr(eventName); eventFinder_events += "<p><b>" + eventName + "</b> - " + eventContent + "</p>";}}});'

/* injection css */
var MARKED_ELEMENTS_CSS =   '.eventFinder_jqEvent:hover {border: 2px solid #002FFF;} ' +
                            '.eventFinder_jqLive:hover {border: 2px solid #002FFF;} ' +
                            '.eventFinder_domEvent:hover {border: 2px solid #002FFF;}';
                            
var POPUP_CSS = '#eventFinder_popup {background: #CCE1E3; border: 3px solid #2E6E75; color: #000; font-family:arial; font-size:15px; z-index:3000; position:absolute; padding:30px; -webkit-border-radius:20px;-moz-border-radius:20px;border-radius:20px;} ' +
                '#eventFinder_close {background:#FFF; width:30px; text-align:center; position:absolute; right:10px; top:10px; cursor:pointer;}';


var isWindows = navigator.userAgent.toLowerCase().indexOf('windows') !== -1;

function escapeHtml(str) {
    return str.replace(/</g, '&lt;').replace(/>/g,'&gt;');
}


function injectScript(scr ,id) {
    jQuery('#'+ id).remove();
    var s = jQuery('<script id="' + id + '"></script>');
    if(isWindows) {scr = escapeHtml(scr);}
    s.html(scr);
    s.appendTo('head');
}

function injectCss(css) {
    jQuery('<style type="text/css"> '+css+' </style>').appendTo('head');
}


injectCss(MARKED_ELEMENTS_CSS);
injectCss(POPUP_CSS);

injectScript(MARK_DOM_EVENTS, 'eventFinder_domScript')
injectScript(MARK_JQUERY_LIVE_EVENTS, 'eventFinder_jqLiveScript');
injectScript(MARK_JQUERY_EVENTS, 'eventFinder_jqScript');


jQuery('.eventFinder_domEvent, .eventFinder_jqEvent, .eventFinder_jqLive').click(function(event) {
    injectScript(CLEAR_EVENTS, 'eventFinder_clearScript');
    jQuery('.eventFinder_selected').removeClass('eventFinder_selected');
    jQuery(this).addClass('eventFinder_selected');
    injectScript(DISPLAY_DOM_EVENTS, 'eventFinder_selectScriptDom');
    injectScript(DISPLAY_JQUERY_LIVE_EVENTS, 'eventFinder_selectScriptJquery');
    injectScript(DISPLAY_JQUERY_EVENTS, 'eventFinder_selectScriptLive');
    injectScript(DISPLAY_EVENTS(event.pageY, 100), 'eventFinder_displayScript');
    return false;
});


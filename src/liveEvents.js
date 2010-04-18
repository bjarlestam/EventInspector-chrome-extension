
	
	function getLiveEventsFor(element) {
		var result = '';
		jQuery.each(jQuery(document).data('events').live, function() {
			if(element.is(this.selector)) {
				result += this.type + '.' + this.origType + ' - ' + this.origHandler + '\n'; 
			}
		});
		return result;
	}
	
	function markLiveEvents() {
		jQuery.each(jQuery(document).data("events").live, function() {
		    jQuery(this.selector).addClass("eventFinder_hasEvent");
			if(element.is(this.selector)) {
				result += this.type + '.' + this.origType + ' - ' + this.origHandler + '\n'; 
			}
		});
	}
	
	console.log(getLiveEventsFor(jQuery('.contextClickEvent')));
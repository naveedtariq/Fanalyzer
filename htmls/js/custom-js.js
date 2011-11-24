var containerId = '#tabs-container';
var tabsId = '#tabs';

$(document).ready(function(){
	// Preload tab on page load
	if($(tabsId + ' LI.current A').length > 0){
		loadTab($(tabsId + ' LI.current A'));
	}
	
    $(tabsId + ' A').click(function(){
    	if($(this).parent().hasClass('current')){ return false; }
    	
    	$(tabsId + ' LI.current').removeClass('current');
    	$(this).parent().addClass('current');
    	
    	loadTab($(this));    	
        return false;
    });
});

function loadTab(tabObj){
    if(!tabObj || !tabObj.length){ return; }
    $(containerId).addClass('loading');
    $(containerId).fadeOut('fast');
    
    $(containerId).load(tabObj.attr('href'), function(){
        $(containerId).removeClass('loading');
        $(containerId).fadeIn('fast');
    });
}






/* Here i used tooltip for elements for better interaction*/
jQuery(document).ready(function(){
	
	$('a.tipsy').tipsy({
	
		delayIn: 0,      // delay before showing tooltip (ms)
		delayOut: 0,     // delay before hiding tooltip (ms)
		fade: true,     // fade tooltips in/out?
		fallback: '',    // fallback text to use when no tooltip text
		gravity: 's',    // gravity
		html: false,     // is tooltip content HTML?
		live: false,     // use live event support?
		offset: 15,       // pixel offset of tooltip from element
		opacity: 0.8,    // opacity of tooltip
		title: 'title',  // attribute/callback containing tooltip text
		trigger: 'hover' // how tooltip is triggered - hover | focus | manual
	
	});
	
});

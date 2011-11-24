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

var bindings = function(){
/*	$('.cancel-answer').on('click', function(){
		$(this).parent('.a_area').hide('slideUp').remove();
	});


	$('.add-answer').on('click', function(){
		$('.a_area').remove();
		$(this).after('<div style="display:none;margin-top:10px" class="a_area"><textarea style="width:565px;" class="answer_area" placeholder="Type your answer here" rows="4" columns="50"> </textarea> <br /> <br /><input class="post_answer" type="submit" value = "answer" /> <input class="cancel-answer" type="button" value="cancel"/></div>');
		$('.a_area').show('slideDown');
		return false;
	});

	$('.post_answer').on('click',function(){

		var _this = this;
		question_id = $(this).parents('.question_thread').find('#question_id').val();
		answer_text = $(this).parents('.question_thread').find('.answer_area').val();
		url = '/questions/'+question_id + '/answers';

		$.ajax({
			url: url, 
			data: 'answer[text]='+ answer_text,
			type: 'POST',
			beforeSend: function( xhr ) {
				console.log('about to post answer');
			},
			success: function( data ) {
				$(_this).parents('.a_area').remove();	
				console.log(data);
			}
		});
	});*/
};

function loadTab(tabObj){
    if(!tabObj || !tabObj.length){ return; }
    $(containerId).addClass('loading');
    $(containerId).fadeOut('fast');
    
		$.ajax({
			url: tabObj.attr('href'), 
			type: 'GET',
			dataType : 'JSON',
			beforeSend: function( xhr ) {
				console.log('about to load tab');
			},
			success: function( questions) {
				console.log(questions);
				$("#tabs-container").html('');
				for( i in questions){
					$("#tabs-container").append($('#question-box').mustache(questions[i]));
					$("#tabs-container").append($('#answer-box').mustache(questions[i].top_answer));
				}

        $(containerId).removeClass('loading');
        $(containerId).fadeIn('fast');
				bindings();
			}
		});

/*    $(containerId).load(tabObj.attr('href'), function(){
        $(containerId).removeClass('loading');
        $(containerId).fadeIn('fast');
				bindings();
    }); */
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

// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//= require jquery-ui
//= require jquery.wysiwyg

$(document).ready(function(){



	$('.down-thumb').live('click', function(){

		_this = this;
		$question_id = $(this).parents('.voter_thread').prev('.question_thread').find('#question_id').val();
		$answer_id = $(this).parents('.voter_thread').find('#answer_id').val();
    url = Routes.down_vote_question_answer_path($question_id,$answer_id);
//		url = '/questions/' + $question_id + "/answers/" + $answer_id + "/down_vote";
		$.ajax({
			url: url, 
			dataType: 'JSON',
			type: 'POST',
			beforeSend: function( xhr ) {
				console.log('about to post down vote');
			},
			success: function( vote ) {
				console.log(vote);
				$count = $(_this).parents('.voter_thread').find('.vote-count').html(vote.votes);
			}
		});
		
	});

	$('.up-thumb').live('click', function(){

		_this = this;
		$question_id = $(this).parents('.voter_thread').prev('.question_thread').find('#question_id').val();
		$answer_id = $(this).parents('.voter_thread').find('#answer_id').val();
    url = Routes.up_vote_question_answer_path($question_id,$answer_id);
//		url = '/questions/' + $question_id + "/answers/" + $answer_id + "/up_vote";
		$.ajax({
			url: url, 
			dataType: 'JSON',
			type: 'POST',
			beforeSend: function( xhr ) {
				console.log('about to post up vote');
			},
			success: function( vote ) {
				console.log(vote);
				$count = $(_this).parents('.voter_thread').find('.vote-count').html(vote.votes);
			}
		});
		
	});

	$('.post-comment').live('click',function(){
		var _this = this;

		var $voter_thread = $(this).parents('.voter_thread');
		var comment_text = $voter_thread.find('.comment-area').val();
		console.log($voter_thread);
		var answer_id = $voter_thread.find('#answer_id').val();

//		url = '/comments/';
    url = Routes.comments_path();

		$.ajax({
			url: url, 
			data: 'comment[comment]='+ comment_text+'&answer_id='+answer_id,
			dataType: 'JSON',
			type: 'POST',
			beforeSend: function( xhr ) {
				console.log('about to post answer');
			},
			success: function( comment ) {
				console.log(comment);
				$voter_thread.find('.comment-container').before($('#comment-box').mustache(comment));
				$voter_thread.find('.comment-area').val('');
			
			}
		});
	});

	$('.cmnt').live('click', function(){
		$(".comment-box").remove();
		$voter_thread = $(this).parents('.voter_thread');
		$answer = $voter_thread.find('#answer_id');

		$.ajax({
//			url: '/comments', 
      url: Routes.comments_path(),
			dataType: 'JSON',
			data: 'answer_id='+$answer.val(),
			type: 'GET',
			beforeSend: function( xhr ) {
				console.log('about to post answer');
			},
			success: function( answer ) {
				var partials = {
					comment: $('#comment-box').html()
				};
				$voter_thread.append($('#comments-box').mustache(answer, partials));
			}
		});
		
	});


	$('.cancel-answer').live('click', function(){
		$(this).parent('.a_area').hide('slideUp').remove();
	});


	$('.add-answer').live('click', function(){
		$('.a_area').remove();
		$(this).after('<div style="display:none;margin-top:10px" class="a_area"><textarea style="width:565px;" class="answer_area" placeholder="Type your answer here" rows="4" columns="50"> </textarea> <br /> <br /><input class="post_answer" type="submit" value = "answer" /> <input class="cancel-answer" type="button" value="cancel"/></div>');
		$('.a_area').show('');
		return false;
	});

	$('.post_answer').live('click',function(){

		var _this = this;
		question_id = $(this).parents('.question_thread').find('#question_id').val();
		answer_text = $(this).parents('.question_thread').find('.answer_area').val();
    url = Routes.question_answers_path(question_id);
//		url = '/questions/'+question_id + '/answers';

		$.ajax({
			url: url, 
			data: 'answer[text]='+ answer_text,
			dataType: 'JSON',
			type: 'POST',
			beforeSend: function( xhr ) {
				console.log('about to post answer');
			},
			success: function( answer ) {
					console.log(_this);
				console.log(answer);
				if(answer.first_answer){
					console.log(_this);
					console.log("asdfasdfasdfasdf");
					$(_this).parents('.question_thread').after($('#answer-box').mustache(answer));
				
				}
				$(_this).parents('.a_area').remove();	
//				var cur_tab = $(tabsId + ' LI.current a');
//				loadTab(cur_tab);
			}
		});
	});

	$('.post_answer_page').live('click',function(){

		var _this = this;
		question_id = $(this).parents().find('.question_thread').find('#question_id').val();
		answer_text = $(this).parents().find('.answer_area').val();
    url = Routes.question_answers_path(question_id);
//		url = '/questions/'+question_id + '/answers';

		$.ajax({
			url: url, 
			data: 'answer[text]='+ answer_text,
			type: 'POST',
			beforeSend: function( xhr ) {
				console.log('about to post answer');
			},
			success: function( data ) {
				console.log(data);
			}
		});
	});
	
});

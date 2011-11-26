var oauth_callback = function(info){
	info = JSON.parse(info);
	console.log(info);
	if(info.new){
		show_social_form();
		oauth_data();
		return;
	}
	if(info.registered){
		window.location.href = Routes.user_home_path();
		return;
	}
	if(info.incomplete){
		show_social_form();
		oauth_data();
		if(info.no_password){
			$('body').append("You are already registered. Please provide a password to complete your registration");
		}
		else{
			$('body').append("You are already registered. Please provide an email & password to complete your registration");
		}	
		return;
	}
	if(info.inactive){
		$('body').append("You are already registered Please activate your account from the confirmation email");
		return;
	}
	return;
}
var oauth_data = function() {
  $.ajax({
    type: "GET",
    url: Routes.omniauth_callbacks_oauth_data_path(),
    success: function(data){
      populate_form(data);
      }
    });
}

var populate_form = function(data){

  $('#social-reg').find('#user_email').val(data['email']);
  $('#social-reg').find('#user_name').html(data['name']);
  $('.social_image').attr("src",data["image"]);
}

var dynamic_form = function (_main_div, _suc_div, _outer_div){

	var main_div = $('#'+_main_div);
	var suc_div = $('#'+_suc_div);
	var outer_div = $('#'+_outer_div);
	var form = main_div.find("form");
	var back_btn = main_div.find(".back-btn");
	var suc_back = suc_div.find(".back-btn");

	var clear_omniauth = function(){
		$.ajax({
    type: "POST",
    url: Routes.omniauth_callbacks_clear_omniauth_path(),
    success: function(){
				console.log("cleared omniauth");
      }
    });
	};

	suc_back.click(function(){
		suc_div.hide('slow');
		outer_div.show();
	});

	back_btn.click(function(){
		main_div.hide('slow');
		suc_div.hide('slow');
		outer_div.show();
		clear_omniauth();
		
	});
	console.log('dynamic form called for' + main_div.attr('id'));

	var before_setup = function(){
		$('.er_span').remove();
	};
	var on_complete = function(){
		console.log("on_complete called");
	};
	var on_success= function(evt, data, status, xhr){
		res = JSON.parse(xhr.responseText);	
		if(res.errors){
			show_errors(res.errors);
			return;
		}
		main_div.hide('slow');
		suc_div.show();
	};
	var on_error = function(evt, xhr, status, error){
		var er = JSON.parse(xhr.responseText);
		show_errors(er);
	};

	var show_errors= function(errors){
		$.each(errors, function(k, v){
			form.find('#user_'+k).after('<span class="er_span" style="color:red;">'+k+' '+v+'</span>');
		});
	}

	form	
		.bind('ajax:beforeSend', before_setup)
		.bind('ajax:complete', on_complete)
		.bind('ajax:success', on_success)
		.bind('ajax:error', on_error);
};

var show_social_form= function() {
  $('#reg-home').hide('slow');
  $('#email-reg').hide('slow');
  $('#social-reg').show();
}

$(document).ready(function() {
	dynamic_form('social-reg','reg-success', 'reg-home');
	dynamic_form('email-reg','reg-success', 'reg-home');
	$("#email-btn").click(function(){
		$('#reg-home').hide('slow');
		$('#email-reg').show();
	});

	$('.social-reg').click(function() {
		var left = (screen.width/2)-(600/2);
		var top = (screen.height/2)-(300/2);
		var w = window.open($(this).attr('rel'), 'Link Your '+$(this).attr('name')+'Account', config='top='+top+', left='+left+',height=500, width=600, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, directories=no, status=no');
		return false;
 });
});


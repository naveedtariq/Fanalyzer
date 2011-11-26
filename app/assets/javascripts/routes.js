(function(){

  var defaults = {
    prefix: '',
    format: ''
  };
  
  var Utils = {

    serialize: function(obj){
      if (obj === null) {return '';}
      var s = [];
      for (prop in obj){
        s.push(prop + "=" + encodeURIComponent(obj[prop].toString()));
      }
      if (s.length === 0) {
        return '';
      }
      return "?" + s.join('&');
    },

    clean_path: function(path) {
      return path.replace(/\/+/g, "/").replace(/[\)\(]/g, "").replace(/\.$/m, '').replace(/\/$/m, '');
    },

    extract: function(name, options) {
      var o = undefined;
      if (options.hasOwnProperty(name)) {
        o = options[name];
        delete options[name];
      } else if (defaults.hasOwnProperty(name)) {
        o = defaults[name];
      }
      return o;
    },

    extract_format: function(options) {
      var format = options.hasOwnProperty("format") ? options.format : defaults.format;
      delete options.format;
      return format ? "." + format : "";
    },

    extract_anchor: function(options) {
      var anchor = options.hasOwnProperty("anchor") ? options.anchor : null;
      delete options.anchor;
      return anchor ? "#" + anchor : "";
    },

    extract_options: function(number_of_params, args) {
      if (args.length > number_of_params) {
        return typeof(args[args.length-1]) == "object" ?  args.pop() : {};
      } else {
        return {};
      }
    },

    path_identifier: function(object) {
      if (!object) {
        return "";
      }
      if (typeof(object) == "object") {
        return (object.to_param || object.id || object).toString();
      } else {
        return object.toString();
      }
    },

    build_path: function(number_of_params, parts, optional_params, args) {
      args = Array.prototype.slice.call(args);
      var result = Utils.get_prefix();
      var opts = Utils.extract_options(number_of_params, args);
      if (args.length > number_of_params) {
        throw new Error("Too many parameters provided for path");
      }
      var params_count = 0, optional_params_count = 0;
      for (var i=0; i < parts.length; i++) {
        var part = parts[i];
        if (Utils.optional_part(part)) {
          var name = optional_params[optional_params_count];
          optional_params_count++;
          // try and find the option in opts
          var optional = Utils.extract(name, opts);
          if (Utils.specified(optional)) {
            result += part;
            result += Utils.path_identifier(optional);
          }
        } else {
          result += part;
          if (params_count < number_of_params) {
            params_count++;
            var value = args.shift();
            if (Utils.specified(value)) {
              result += Utils.path_identifier(value);
            } else {
              throw new Error("Insufficient parameters to build path");
            }
          }
        }
      }
      var format = Utils.extract_format(opts);
      var anchor = Utils.extract_anchor(opts);
      return Utils.clean_path(result + format + anchor) + Utils.serialize(opts);
    },

    specified: function(value) {
      return !(value === undefined || value === null);
    },

    optional_part: function(part) {
      return part.match(/\(/);
    },

    get_prefix: function(){
      var prefix = defaults.prefix;

      if( prefix !== "" ){
        prefix = prefix.match('\/$') ? prefix : ( prefix + '/');
      }
      
      return prefix;
    }

  };

  window.Routes = {
// root => /
  root_path: function(options) {
  return Utils.build_path(0, ["/"], [], arguments)
  },
// sign_in => /sign_in(.:format)
  sign_in_path: function(options) {
  return Utils.build_path(0, ["/sign_in"], ["format"], arguments)
  },
// sign_out => /sign_out(.:format)
  sign_out_path: function(options) {
  return Utils.build_path(0, ["/sign_out"], ["format"], arguments)
  },
// omniauth_callbacks_oauth_data => /omniauth_callbacks/oauth_data(.:format)
  omniauth_callbacks_oauth_data_path: function(options) {
  return Utils.build_path(0, ["/omniauth_callbacks/oauth_data"], ["format"], arguments)
  },
// omniauth_callbacks_clear_omniauth => /omniauth_callbacks/clear_omniauth(.:format)
  omniauth_callbacks_clear_omniauth_path: function(options) {
  return Utils.build_path(0, ["/omniauth_callbacks/clear_omniauth"], ["format"], arguments)
  },
// new_user_session => /users/sign_in(.:format)
  new_user_session_path: function(options) {
  return Utils.build_path(0, ["/users/sign_in"], ["format"], arguments)
  },
// user_session => /users/sign_in(.:format)
  user_session_path: function(options) {
  return Utils.build_path(0, ["/users/sign_in"], ["format"], arguments)
  },
// destroy_user_session => /users/sign_out(.:format)
  destroy_user_session_path: function(options) {
  return Utils.build_path(0, ["/users/sign_out"], ["format"], arguments)
  },
// user_omniauth_callback => /users/auth/:action/callback(.:format)
  user_omniauth_callback_path: function(_action, options) {
  return Utils.build_path(1, ["/users/auth/", "/callback"], ["format"], arguments)
  },
// user_password => /users/password(.:format)
  user_password_path: function(options) {
  return Utils.build_path(0, ["/users/password"], ["format"], arguments)
  },
// new_user_password => /users/password/new(.:format)
  new_user_password_path: function(options) {
  return Utils.build_path(0, ["/users/password/new"], ["format"], arguments)
  },
// edit_user_password => /users/password/edit(.:format)
  edit_user_password_path: function(options) {
  return Utils.build_path(0, ["/users/password/edit"], ["format"], arguments)
  },
// cancel_user_registration => /users/cancel(.:format)
  cancel_user_registration_path: function(options) {
  return Utils.build_path(0, ["/users/cancel"], ["format"], arguments)
  },
// user_registration => /users(.:format)
  user_registration_path: function(options) {
  return Utils.build_path(0, ["/users"], ["format"], arguments)
  },
// new_user_registration => /users/sign_up(.:format)
  new_user_registration_path: function(options) {
  return Utils.build_path(0, ["/users/sign_up"], ["format"], arguments)
  },
// edit_user_registration => /users/edit(.:format)
  edit_user_registration_path: function(options) {
  return Utils.build_path(0, ["/users/edit"], ["format"], arguments)
  },
// user_confirmation => /users/confirmation(.:format)
  user_confirmation_path: function(options) {
  return Utils.build_path(0, ["/users/confirmation"], ["format"], arguments)
  },
// new_user_confirmation => /users/confirmation/new(.:format)
  new_user_confirmation_path: function(options) {
  return Utils.build_path(0, ["/users/confirmation/new"], ["format"], arguments)
  },
// user_home => /home(.:format)
  user_home_path: function(options) {
  return Utils.build_path(0, ["/home"], ["format"], arguments)
  },
// complete_registration_users => /users/complete_registration(.:format)
  complete_registration_users_path: function(options) {
  return Utils.build_path(0, ["/users/complete_registration"], ["format"], arguments)
  },
// users => /users(.:format)
  users_path: function(options) {
  return Utils.build_path(0, ["/users"], ["format"], arguments)
  },
// new_user => /users/new(.:format)
  new_user_path: function(options) {
  return Utils.build_path(0, ["/users/new"], ["format"], arguments)
  },
// edit_user => /users/:id/edit(.:format)
  edit_user_path: function(_id, options) {
  return Utils.build_path(1, ["/users/", "/edit"], ["format"], arguments)
  },
// user => /users/:id(.:format)
  user_path: function(_id, options) {
  return Utils.build_path(1, ["/users/"], ["format"], arguments)
  },
// comments => /comments(.:format)
  comments_path: function(options) {
  return Utils.build_path(0, ["/comments"], ["format"], arguments)
  },
// new_comment => /comments/new(.:format)
  new_comment_path: function(options) {
  return Utils.build_path(0, ["/comments/new"], ["format"], arguments)
  },
// edit_comment => /comments/:id/edit(.:format)
  edit_comment_path: function(_id, options) {
  return Utils.build_path(1, ["/comments/", "/edit"], ["format"], arguments)
  },
// comment => /comments/:id(.:format)
  comment_path: function(_id, options) {
  return Utils.build_path(1, ["/comments/"], ["format"], arguments)
  },
// up_vote_question_answer => /questions/:question_id/answers/:id/up_vote(.:format)
  up_vote_question_answer_path: function(_question_id, _id, options) {
  return Utils.build_path(2, ["/questions/", "/answers/", "/up_vote"], ["format"], arguments)
  },
// down_vote_question_answer => /questions/:question_id/answers/:id/down_vote(.:format)
  down_vote_question_answer_path: function(_question_id, _id, options) {
  return Utils.build_path(2, ["/questions/", "/answers/", "/down_vote"], ["format"], arguments)
  },
// question_answers => /questions/:question_id/answers(.:format)
  question_answers_path: function(_question_id, options) {
  return Utils.build_path(1, ["/questions/", "/answers"], ["format"], arguments)
  },
// new_question_answer => /questions/:question_id/answers/new(.:format)
  new_question_answer_path: function(_question_id, options) {
  return Utils.build_path(1, ["/questions/", "/answers/new"], ["format"], arguments)
  },
// edit_question_answer => /questions/:question_id/answers/:id/edit(.:format)
  edit_question_answer_path: function(_question_id, _id, options) {
  return Utils.build_path(2, ["/questions/", "/answers/", "/edit"], ["format"], arguments)
  },
// question_answer => /questions/:question_id/answers/:id(.:format)
  question_answer_path: function(_question_id, _id, options) {
  return Utils.build_path(2, ["/questions/", "/answers/"], ["format"], arguments)
  },
// my_questions => /questions/my(.:format)
  my_questions_path: function(options) {
  return Utils.build_path(0, ["/questions/my"], ["format"], arguments)
  },
// questions => /questions(.:format)
  questions_path: function(options) {
  return Utils.build_path(0, ["/questions"], ["format"], arguments)
  },
// new_question => /questions/new(.:format)
  new_question_path: function(options) {
  return Utils.build_path(0, ["/questions/new"], ["format"], arguments)
  },
// edit_question => /questions/:id/edit(.:format)
  edit_question_path: function(_id, options) {
  return Utils.build_path(1, ["/questions/", "/edit"], ["format"], arguments)
  },
// question => /questions/:id(.:format)
  question_path: function(_id, options) {
  return Utils.build_path(1, ["/questions/"], ["format"], arguments)
  }}
;
  window.Routes.options = defaults;
})();

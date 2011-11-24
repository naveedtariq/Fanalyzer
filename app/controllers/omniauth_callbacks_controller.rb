class OmniauthCallbacksController < ApplicationController
	layout nil

	def clear_omniauth
    token = UserToken.find_by_provider_and_uid(session[:omniauth]['provider'], session[:omniauth]['uid'])
    token.user.destroy();
    session[:omniauth] = nil
    render :json => "success"
  end

 def method_missing(provider) 
    provider = params[:provider]
    omniauth = env["omniauth.auth"]
		authentication = UserToken.find_by_provider_and_uid(omniauth['provider'], omniauth['uid'])
		if authentication
			flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => omniauth['provider']
			if authentication.user.confirmed_at
				@info = {:registered => true}.to_json
				sign_in(:user,authentication.user)
				render :action => "facebook" and return
			elsif authentication.user.encrypted_password.blank?
				@info = {:incomplete => true, :no_password => true }.to_json
				if authentication.user.email.blank?
					@info = {:incomplete => true, :no_email_and_password => true }.to_json
				end
				session[:omniauth] = omniauth.except('extra')
				flash[:error] = "Please Provide Password to complete the registration!"
				render :action => "facebook" and return
			else
				@info = {:inactive => true }.to_json
				flash[:error] = "You need to confirm your account before proceeding"
				render :action => "facebook" and return
			end
		else
			#create a new user
			unless omniauth.recursive_find_by_key("email").blank?
				user = User.find_or_initialize_by_email(omniauth.recursive_find_by_key("email"))
				if(user.confirmed_at)
					user.apply_omniauth(omniauth)
					user.save!
					sign_in(:user, user)
					@info = {:registered => true}.to_json
					render :action => "facebook" and return
				end
			else
				user = User.new
			end
			user.apply_omniauth(omniauth)
			if user.save(:validate => false)
				session[:omniauth] = omniauth.except('extra')
				@info = {:new => true}.to_json
				render :action => "facebook" and return
			end
		end
  end
  
  def oauth_data
    type = params[:type]
    render :json => session[:omniauth]["user_info"].to_json
  end
  
  def passthru
    render :file => "#{Rails.root}/public/404.html", :status => 404, :layout => false
  end
end

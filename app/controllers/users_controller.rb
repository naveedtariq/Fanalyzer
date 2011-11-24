class UsersController < ApplicationController

	before_filter :authenticate_user!, :except => [ :complete_registration ]


	def complete_registration
		token = UserToken.find_by_uid(session[:omniauth]["uid"]) if session[:omniauth] && session[:omniauth]["uid"]
    if token
      user = token.user if token.user
      if user
        user.update_attributes(params[:user])
        if user.valid?
          user.send_confirmation_instructions
          return render :json=>{:user => user}
        end
          return render :json=>{:user => user, :errors => user.errors}
      end
    end
	end

	def home
		@recent_questions = Question.recent
	end

	def show
		render :text => 'wajo'
	end

	def edit
			
	end

	def update
		current_user.update_attributes(params[:user])
		redirect_to user_home_path
	end

end

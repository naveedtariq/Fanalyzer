class PagesController < ApplicationController

	layout 'home'

	def index
		redirect_to user_home_path if current_user
	end

end

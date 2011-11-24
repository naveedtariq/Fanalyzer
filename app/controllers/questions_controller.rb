class QuestionsController < ApplicationController
	before_filter :authenticate_user!
	layout nil

	def show
		@question = Question.find(params[:id])
		render :layout => 'application'
	end

	def my
		@questions = current_user.questions.order('id DESC').limit(3)
		@questions.to_json
		render :partial => 'listing'
	end

	def index
		@questions = Question.recent(0)
		render :partial => 'listing'
	end

	def new
		@question = Question.new
		@categories = Category.all
	end	

	def create
		@question = current_user.questions.create(params[:question])
		redirect_to user_home_path
	end

	
end

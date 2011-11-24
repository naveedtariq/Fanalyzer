class CommentsController < ApplicationController

	before_filter :authenticate_user!

	def index
		@comments = Answer.find(params[:answer_id]).comments
		render :layout => false
#		render :json => { :comments => [{:comment => 'hello'},{:comment => 'wajo'},{:comment => 'hahahah'}] }
	end

	def create
		@comment = Answer.find(params[:answer_id]).comments.create(:comment => params[:comment]['comment'], :user_id => current_user.id)
		render :layout => false
	end
end

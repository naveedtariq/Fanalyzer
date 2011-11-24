class AnswersController < ApplicationController

	before_filter :authenticate_user!, [:only => :create]

	def create
		if(params[:question_id])
			question = Question.find(params[:question_id])	
			if question
				@answer = question.answers.create(params[:answer].merge({:user_id => current_user.id}))
				unless @answer.errors.empty?
					render :json => { :error => @answer.errors } and return
				else
					render :layout => false and return
				end
			else
				render :json => { :error => 'no such question' } and return
			end
		end
		render :json => { :error => 'missing param' } and return 
	end

	def up_vote
		answer = Answer.find(params[:id])
		vote = answer.votes.find_by_user_id(current_user.id)
		vote.delete if vote	
		vote = Answer.find(params[:id]).votes.create(:up => true, :user_id => current_user.id)
		render :json => { :votes => answer.up_votes}
	end

	def down_vote
		answer = Answer.find(params[:id])
		vote = answer.votes.find_by_user_id(current_user.id)
		vote.delete if vote	
		vote = Answer.find(params[:id]).votes.create(:up => false, :user_id => current_user.id)
		render :json => { :votes => answer.up_votes}
	end

end

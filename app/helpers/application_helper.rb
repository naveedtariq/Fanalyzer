module ApplicationHelper

	def comment_hash(comment)
		{ :id => comment.id, :comment => comment.comment, :user_image => comment.user.avatar(:tiny), :user_name => comment.user.name }
	end

	def comments_json(comments)
		json = {}
		json[:comments] = []
		comments.each do | comment |
			json[:comments] << comment_hash(comment)
		end
		json.to_json
	end

	def questions_json(questions)
		json = []
		questions.each do | question |
			q_hash = question_hash question
			q_hash[:top_answer] = answer_hash question.top_answer		
			json << q_hash
		end
		json.to_json
	end

	def question_hash(question)
			{ :id => question.id, :title => question.title, :user_name => question.user.name, :user_image => question.user.avatar(:tiny),
			  :description => truncate(question.description, :length => 150), :question_url => question_path(question),
				:posted_at => time_ago_in_words(question.created_at), :can_answer => question.owner?(current_user),
				:following => question.user_following?(current_user),
				:num_answers =>question.answers.count }
	end

	def answer_hash(answer)
		if answer
			{ :user_image => answer.user.avatar(:tiny), :user_name => answer.user.name, :id => answer.id,
				:title => answer.title, :text => truncate(answer.text, :length => 150),
				:first_answer => (answer.question.answers.count == 1),
				:num_comments => answer.comments.count, :up_votes => answer.up_votes }
		end
	end
end

class Question < ActiveRecord::Base
	has_many :answers
	belongs_to :category
	belongs_to :user

	def self.recent(offset = 0)
		find(:all, :order => 'id DESC', :limit => 3, :offset => offset)
	end

	def top_answer
		answers.first
	end

	def user_following?(user)
		owner?(user)
	end

	def owner?(user)
		if user
			(user.id == self.user_id)	
		else
			nil
		end
	end

end

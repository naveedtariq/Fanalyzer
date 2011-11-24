class Answer < ActiveRecord::Base
	belongs_to :user
	belongs_to :question

	validates :text, :length => { :minimum => 10 }
	
	acts_as_commentable

	has_many :votes

	def up_votes
		self.votes.where(:up => true).count
	end

end

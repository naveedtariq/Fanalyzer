class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable, :omniauthable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me, :avatar

	has_attached_file :avatar, :styles => { :medium => "300x300#", :thumb => "200x200#", :small => "100x100#", :tiny => "50x50#" },:default_url => '/assets/default-avatar-:style.jpg'

	has_many :user_tokens, :dependent => :destroy
	has_many :answers
	has_many :questions

	def confirmation_required?
    (!self.encrypted_password.blank?) && super
  end

  def self.find_for_facebook_oauth(access_token, signed_in_resource=nil)
    data = access_token['extra']['user_hash']
    User.find_by_email(data["email"])
  end

  def self.find_for_twitter_oauth(access_token, signed_in_resource=nil)
    data = access_token['extra']['user_hash']
    User.create(:name => data['name'])
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session[:omniauth]
        user.user_tokens.build(:provider => data['provider'], :uid => data['uid'])
      end
    end
  end
                                
  def apply_omniauth(omniauth)
    self.name = omniauth['user_info']['name'] if name.blank?
    unless omniauth['credentials'].blank?
      user_tokens.build(:provider => omniauth['provider'], 
                        :uid => omniauth['uid'],
                        :token => omniauth['credentials']['token'], 
                        :secret => omniauth['credentials']['secret'])
		else
			user_tokens.build(:provider => omniauth['provider'], :uid => omniauth['uid'])
		end
  end
end

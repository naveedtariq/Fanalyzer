class AddTokenAndSecretToUserToken < ActiveRecord::Migration
  def change
		add_column :user_tokens, :token, :string
		add_column :user_tokens, :secret, :string
  end
end

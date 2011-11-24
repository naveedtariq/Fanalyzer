class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :answer_id
      t.boolean :up
			t.integer :user_id
      t.timestamps
    end
  end
end

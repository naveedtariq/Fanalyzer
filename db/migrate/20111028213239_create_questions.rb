class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.text :description
      t.integer :user_id
      t.string :title
      t.integer :category_id
      t.datetime :dealine

      t.timestamps
    end
  end
end

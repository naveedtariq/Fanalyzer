class SeedCategories < ActiveRecord::Migration
  def up
		['Sit/Start', 'Trade Advice', 'General Roster Advice'].each do |name|
			Category.create(:name => name)
		end
  end

  def down
		Category.delete_all
  end
end

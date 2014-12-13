class AddPosts < ActiveRecord::Migration
	def change
		create_table :posts do |t|
			t.integer :likes
			t.text :desc

			t.timestamps
		end
	end
end

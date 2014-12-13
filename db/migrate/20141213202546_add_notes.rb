class AddNotes < ActiveRecord::Migration
	def change
		create_table :notes do |t|
			t.belongs_to :user
			t.integer :likes
			t.text :desc

			t.timestamps
		end
	end
end

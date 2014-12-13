class AddComments < ActiveRecord::Migration
	def change
		create_table :comments do |t|
			t.belongs_to :note
			t.belongs_to :user
			t.string :desc

			t.timestamps
		end
	end
end

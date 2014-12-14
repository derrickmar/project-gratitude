class CreateImages < ActiveRecord::Migration
	def change
		create_table :images do |t|
			t.belongs_to :note
			t.timestamps
		end
	end
end

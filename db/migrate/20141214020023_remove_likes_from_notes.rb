class RemoveLikesFromNotes < ActiveRecord::Migration
  def change
  	remove_column :notes, :likes
  end
end

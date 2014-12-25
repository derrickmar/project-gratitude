# == Schema Information
#
# Table name: notes
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  desc       :text
#  created_at :datetime
#  updated_at :datetime
#

class Note < ActiveRecord::Base
	# paginates_per 10

	belongs_to :user
	has_many :comments
	has_many :likes
	has_many :images
end

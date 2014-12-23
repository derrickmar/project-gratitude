# == Schema Information
#
# Table name: images
#
#  id               :integer          not null, primary key
#  note_id          :integer
#  created_at       :datetime
#  updated_at       :datetime
#  pic_file_name    :string(255)
#  pic_content_type :string(255)
#  pic_file_size    :integer
#  pic_updated_at   :datetime
#

class Image < ActiveRecord::Base
	belongs_to :note

	has_attached_file :pic, :styles => { :medium => "400x400>", :thumb => "100x100>" }, :default_url => "/images/:style/question-mark.svg"
	validates_attachment_content_type :pic, :content_type => /\Aimage\/.*\Z/
end

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

FactoryGirl.define do
  factory :image do
    
  end

end

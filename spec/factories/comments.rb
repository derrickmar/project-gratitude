# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  note_id    :integer
#  user_id    :integer
#  desc       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

FactoryGirl.define do
  factory :comment do
    desc "MyString"
  end

end

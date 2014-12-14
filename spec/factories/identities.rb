# == Schema Information
#
# Table name: identities
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  provider   :string(255)
#  uid        :string(255)
#  created_at :datetime
#  updated_at :datetime
#

FactoryGirl.define do
  factory :identity do
    user nil
provider "MyString"
uid "MyString"
  end

end

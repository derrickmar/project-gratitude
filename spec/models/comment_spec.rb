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

require 'spec_helper'

describe Comment do
  pending "add some examples to (or delete) #{__FILE__}"
end

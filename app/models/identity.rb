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

class Identity < ActiveRecord::Base
	belongs_to :user
	validates_presence_of :uid, :provider, :if => :not_local_identity?
	# scope limits the uniqueness check to that provider's scope
	validates_uniqueness_of :uid, :scope => :provider, :if => :not_local_identity?

	def self.find_for_oauth(auth)
		find_or_create_by(uid: auth.uid, provider: auth.provider)
	end

	protected
		def not_local_identity?
			return self.provider != "local"
		end
end

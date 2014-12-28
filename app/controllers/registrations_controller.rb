class RegistrationsController < Devise::RegistrationsController
	after_filter :add_local_identity

	protected

	def add_local_identity
		if resource.persisted?
			Identity.find_or_create_by(user_id: resource.id, provider: "local")
		end
	end

	# Change password without password confirmation
	def update_resource(resource, params)
		resource.update_without_password(params)
	end

	
end
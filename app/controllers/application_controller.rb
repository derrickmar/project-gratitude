class ApplicationController < ActionController::Base
	before_action :configure_permitted_parameters, if: :devise_controller?
 	# Prevent CSRF attacks by raising an exception.
 	# For APIs, you may want to use :null_session instead.
 	protect_from_forgery with: :exception

 	def ensure_signup_complete
		# Ensure we don't go into an infinite loop
		return if action_name == 'finish_signup'

		# Redirect to the 'finish_signup' page if the user
		# email hasn't been verified yet
		if current_user && !current_user.email_verified?
			redirect_to finish_signup_path(current_user)
		end
	end

	# ======= CURRENT OR GUEST USER PERSISTANCE
	def current_user
		super || guest_user
	end

	private

	def guest_user
		# if session[:guest_user_id].nil?
		# 	session[:guest_user_id] = create_guest_user.id
		User.find(session[:guest_user_id].nil? ? session[:guest_user_id] = create_guest_user.id : session[:guest_user_id])
	end

	def create_guest_user
		u = User.create(
			name: "guest",
			email: "guest_#{Time.now.to_i}#{rand(99)}@example.com",
			is_guest: true
			)
		u.save(:validate => false)
		u
	end

	protected

	def configure_permitted_parameters
		devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:name, :email, :password) }
		devise_parameter_sanitizer.for(:account_update) << [:avatar, :name]
		# devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:name, :email, :password, :current_password, :avatar) }
	end
end

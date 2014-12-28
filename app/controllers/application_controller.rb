class ApplicationController < ActionController::Base
	before_action :configure_permitted_parameters, if: :devise_controller?
	before_action :current_or_guest_user
	helper_method :current_or_guest_user
 	# ADD protect_from_forgery to every controller to support ajax requests for guests
 	# https://github.com/plataformatec/devise/wiki/How-To:-Create-a-guest-user
 	# protect_from_forgery with: :exception

 	def ensure_signup_complete
		# Ensure we don't go into an infinite loop
		return if action_name == 'finish_signup'

		# Redirect to the 'finish_signup' page if the user
		# email hasn't been verified yet
		if current_user && !current_user.email_verified?
			redirect_to finish_signup_path(current_user)
		end
	end

	# if user is logged in, return current_user, else return guest_user
	def current_or_guest_user
		if current_user
			if session[:guest_user_id] && session[:guest_user_id] != current_user.id
				logging_in
				guest_user(with_retry = false).try(:destroy)
				session[:guest_user_id] = nil
			end
			current_user
		else
			guest_user
		end
	end

	# find guest_user object associated with the current session,
	# creating one as needed
	def guest_user(with_retry = true)
	    # Cache the value the first time it's gotten.
	    @cached_guest_user ||= User.find(session[:guest_user_id] ||= create_guest_user.id)

	  rescue ActiveRecord::RecordNotFound # if session[:guest_user_id] invalid
	  	session[:guest_user_id] = nil
	  	guest_user if with_retry
	  end

	# called (once) when the user logs in, insert any code your application needs
	# to hand off from guest_user to current_user.
	def logging_in
		guest_comments = guest_user.comments.all
		guest_comments.each do |comment|
			comment.user_id = current_user.id
			comment.save!
		end
		guest_notes = guest_user.notes.all
		guest_notes.each do |note|
			note.user_id = current_user.id
			note.save!
		end
		guest_likes = guest_user.likes.all
		guest_likes.each do |like|
			like.user_id = current_user.id
			like.save!
		end
	end

	def create_guest_user
		u = User.create(
			:name => "Guest",
			:email => "guest_#{Time.now.to_i}#{rand(100)}@example.com",
			is_guest: true
			)
		u.skip_confirmation!
		u.save!(:validate => false)
		session[:guest_user_id] = u.id
		u
	end

	protected

	def configure_permitted_parameters
		devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:name, :email, :password, :password_confirmation) }
		devise_parameter_sanitizer.for(:account_update) << [:avatar, :name]
		devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:name, :avatar, :email, :password, :password_confirmation, :current_password) }
		# devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:name, :email, :password, :current_password, :avatar) }
	end
end

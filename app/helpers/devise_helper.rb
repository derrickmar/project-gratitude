module DeviseHelper
  def devise_error_messages!
    return '' if resource.errors.empty?

    if resource.errors.added?(:email, :taken)
      hasOauthIdentity =  User.find_by(email: resource.email).identities.any? do |identity|
        identity.provider == 'facebook'
      end
      if hasOauthIdentity
        resource.errors.delete(:email)
        resource.errors.add(:email, 'was authenticated through Facebook.  Please sign in with FB')
      end
    end
      
    messages = resource.errors.full_messages.map { |msg| content_tag(:li, msg) }.join
    html = <<-HTML
    <div class="alert alert-error alert-block"> <button type="button"
      class="close" data-dismiss="alert">x</button>
      #{messages}
    </div>
    HTML

    html.html_safe
  end
end
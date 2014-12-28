class RegistrationsController < Devise::RegistrationsController
  after_filter :add_local_identity

  protected

  def add_local_identity
    if resource.persisted? # user was created successfuly
      Identity.find_or_create_by(uid: resource.id, provider: "local")
    end
 end
end
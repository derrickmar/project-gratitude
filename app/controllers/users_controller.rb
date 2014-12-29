class UsersController < ApplicationController
  protect_from_forgery
  before_action :set_user, only: [:show, :update, :edit, :update, :destroy, :finish_signup, :update_profile_pic, :crop_image]

  def create
    @user = User.create(user_params)
  end

  # GET /users/:id.:format
  def show
    # authorize! :read, @user CANCAN
  end

  def update
  end

  # GET /users/:id/edit
  # def edit
  #   # authorize! :update, @user
  # end

  # PATCH/PUT /users/:id.:format
  # def update
  #   # authorize! :update, @user
  #   respond_to do |format|
  #     if @user.update(user_params)
  #       sign_in(@user == current_user ? @user : current_user, :bypass => true)
  #       format.html { redirect_to @user, notice: 'Your profile was successfully updated.' }
  #       format.json { head :no_content }
  #     else
  #       format.html { render action: 'edit' }
  #       format.json { render json: @user.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  def crop_image
  end

  def update_profile_pic
    if params[:user][:cropping]
      if @user.update_attributes(crop_params)
        puts "successfully cropped pic"
        redirect_to edit_user_registration_path, :notice=> "Successfully cropped profile picture"
      else
        render 'devise/registrations/edit', :alert => "Sorry, something went wrong."
      end
    else
      if @user.update_attributes(user_avatar_params)
        redirect_to crop_image_user_path(@user)
      else
        render 'devise/registrations/edit'
      end
    end
  end

  # GET/PATCH /users/:id/finish_signup
  def finish_signup
    # authorize! :update, @user 
    if request.patch? && params[:user] #&& params[:user][:email]
      puts "IN FINISH_SIGNUP"
      # TODO: This is currently still not the right way, but if we want to
      # integrate a login with twitter that doesn't create a new user,
      # we have to find an existing user and somehow
      # integrate that with facebook
      # if User.find_by(email: params[:user][:email])
      #   puts "found existing user"
      #   redirect_to user_omniauth_authorize_path(:facebook)
        # redirect_to root_path
        if @user.update(user_params)
          @user.skip_reconfirmation!
          sign_in(@user, :bypass => true)
          redirect_to root_path, notice: 'Your profile was successfully updated.'
        else
          @show_errors = true
        end
      end
    end

  # DELETE /users/:id.:format
  def destroy
    # authorize! :delete, @user
    @user.destroy
    respond_to do |format|
      format.html { redirect_to root_url }
      format.json { head :no_content }
    end
  end
  
  private
  def set_user
    @user = User.find(params[:id])
  end

  def user_avatar_params
    params.require(:user).permit(:avatar)
  end

  def crop_params
    params.require(:user).permit(:avatar, :avatar_original_w, :avatar_original_h, :avatar_box_w, :avatar_crop_x, :avatar_crop_y, :avatar_crop_w, :avatar_crop_h, :avatar_aspect)
  end


  # def user_params
  #     accessible = [ :name, :email, :avatar ] # extend with your own params
  #     accessible << [ :password, :password_confirmation ] unless params[:user][:password].blank?
  #     params.require(:user).permit(accessible)
  #   end
end
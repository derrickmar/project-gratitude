class LikesController < ApplicationController

	def create
		@like = Like.new(like_params)
		@note = Note.find(params[:like][:note_id])
		respond_to do |format|
			if @like.save
				format.html { redirect_to root_path } # support a non-ajax call
				format.js { render :template => 'likes/toggle.js.erb' }
			else
				format.html { redirect_to root_path }
				format.js { render :template => 'likes/error.js.erb' }
			end
		end
	end

	def destroy
		@like = Like.find(params[:id])
		@like.destroy
		@note = Note.find(@like.note_id)
		respond_to do |format|
			format.js { render :template => 'likes/toggle.js.erb' }
		end
	end

	private
	def like_params
		params.require(:like).permit(:user_id, :note_id)
	end
end

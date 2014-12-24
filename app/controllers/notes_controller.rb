class NotesController < ApplicationController
	protect_from_forgery :except => [:create, :show]
	before_action :set_note, only: [:show, :edit, :update, :destroy]

	def all
		@note = Note.new
		@notes = Note.all
	end

	def new
		@note = Note.new
	end

	def create
		puts "IN NOTE#CREATE"
		params[:note] = params[:note].merge(user_id: current_or_guest_user.id)
		@note = Note.new(note_params)
		respond_to do |format|
			if @note.save
				if params[:image_id_for_note] != ""
					puts "IMAGE EXISTS --> Creating association with note"
					@image = Image.find(params[:image_id_for_note])
					@note.images << @image
				end
				format.html { redirect_to root_path }
				format.js
			else
				format.html { redirect_to root_path }
				format.js { render :template => 'notes/error.js.erb' }
			end
		end
		js false
	end

	def show
		@comment = Comment.new
		respond_to do |format|
			format.html { @note } # support a non-ajax call
			format.js
		end
		# TODO: PREVENT PALOMA _hook.html.erb FROM RENDERING ON AJAX CALL (for some reason modal doesn't show up when paloma is enabled)
		# this is a quick fix by disabling paloma. Might want to do something better later
		js false
	end

	def like
	end

	def unlike
	end

	def edit
	end

	def update
	end

	def destroy
	end


	private
	def set_note
		@note = Note.find(params[:id])
	end

	def note_params
		params.require(:note).permit(:desc, :user_id)
	end

	def image_params
		params.require(:image).permit(:pic)
	end
end

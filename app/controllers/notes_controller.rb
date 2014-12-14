class NotesController < ApplicationController
	before_action :set_note, only: [:show, :edit, :update, :destroy]

	def all
		@notes = Note.all
	end

	def new
		@note = Note.new
	end

	def create
		params[:note] = params[:note].merge(user_id: current_user.id)
		@note = Note.new(note_params)
		@note.save
		@image = Image.create(image_params)
		@note.images << @image
		redirect_to root_path
	end

	def show
		@comment = Comment.new
		@comments = @note.comments
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

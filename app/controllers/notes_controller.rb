class NotesController < ApplicationController
	before_action :set_note, only: [:show, :edit, :update, :destroy]

	def all
		@notes = Note.all
	end

	def new
		@note = Note.new
	end

	def create
		@note = Note.new(note_params)
		@note.save
		redirect_to root_path
	end

	def show
	end

	def edit
	end

	def update
	end

	def destroy
	end


	private
	def set_note
		@note = note.find(params[:id])
	end

	def note_params
		params.require(:note).permit(:desc)
	end
end

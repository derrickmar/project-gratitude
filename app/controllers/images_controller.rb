class ImagesController < ApplicationController

	def update
	end

	def destroy
	end

	def create
		puts "CREATING IMAGE"
		@image = Image.create(image_params)
		if @image.save
			render json: { message: "success", image_id: @image.id }, :status => 200
		else
			render json: { error: @image.errors.full_messages.join(',')}, :status => 400
		end 
	end

	private
	def image_params
		params.require(:image).permit(:pic)
	end
end

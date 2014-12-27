class ImagesController < ApplicationController

	def update
	end

	def destroy
		puts "DESTROYING IMAGE"
		@image = Image.find(params[:id])
		if @image.destroy
			render json: { success: true }, :status => 200
		else
			render json: { success: false, message: "Sorry for some reason we could not delete the image. Please let us know and we'll try to fix it soon!" }, :status => 400
		end
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

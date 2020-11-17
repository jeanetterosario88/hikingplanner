class TrailsController < ApplicationController

    def index
      trails = Trail.all
      render json: TrailSerializer.new(trails)
    end
     
    def show
        trail = Trail.find_by(id: params[:id])
        options = {
          include: [:name]
       }
        render json: TrailSerializer.new(trail)
    end

    def create
      trail = Trail.new(trail_params)
      trail.likes = 0
      if trail.save
        render json: TrailSerializer.new(trail)
      else
        render json: {message: trail.errors.messages}
      end
    end
    
    def destroy
      trail = Trail.find(params[:id])
      trail.destroy
      render json: TrailSerializer.new(trail)
    end

    private

    def trail_params
      params.require(:trail).permit(:name, :difficulty, :description, :image, :location_id)
    end

end

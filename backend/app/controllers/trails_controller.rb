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
        trail = Trail.new
        trail.location = Location.find(params["location_id"])
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

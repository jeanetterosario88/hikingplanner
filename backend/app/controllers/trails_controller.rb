class TrailsController < ApplicationController

    def index
        trails = Trail.all
        render json: TrailSerializer.new(trails).to_serialized_json
      end
     
    def show
        trail = Trail.find_by(id: params[:id])
        render json: TrailSerializer.new(trail).to_serialized_json
    end

    def create
        trail = Trail.new
        trail.location = Location.find(params["location_id"])
        if trail.save
        render json: TrailSerializer.new(trail).to_serialized_json
        else
        render json: {message: trail.errors.messages[:trail_max][0]}
      end
    end
    
      def destroy
        trail = Trail.find(params[:id])
        trail.destroy
        render json: TrailSerializer.new(trail).to_serialized_json
      end

end

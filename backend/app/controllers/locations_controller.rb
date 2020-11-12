class LocationsController < ApplicationController
    
    def index
        location = Location.all
        render json: LocationSerializer.new(location).to_serialized_json
    end

    def show
        location = Location.find(params[:id])
        options = {
            include: [:city]
        }
        render json: LocationSerializer.new(location, options).to_serialized_json
    end

    def create
        location = Location.new
        if location.save
            render json: LocationSerializer.new(location).to_serialized_json
      end
    end
    
      def destroy
        location = Location.find(params[:id])
        location.destroy
        render json: LocationSerializer.new(location).to_serialized_json
      end


end

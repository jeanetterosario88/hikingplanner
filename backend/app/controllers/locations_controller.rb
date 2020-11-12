class LocationsController < ApplicationController
    
    def index
        location = Location.all
        render json: LocationSerializer.new(location).to_serialized_json
    end

    def show
        location = Location.find(params[:id])
        options = {
            include: [:location]
        }
        render json: LocationSerializer.new(location, options)
    end


  
     
end

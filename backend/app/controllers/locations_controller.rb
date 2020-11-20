class LocationsController < ApplicationController
    
    def index
        location = Location.all
        render json: location.to_json(:include => :trails)
    end

    def show
        location = Location.find(params[:id])
        options = {
            include: [:trails]
        }
        render json: LocationSerializer.new(location, options)
    end

    def create
        location = Location.new(location_params)
        location.city = location.city.capitalize
        if location.save
            render json: LocationSerializer.new(location)
        else
            render json: {errors: location.errors.full_messages}
        end
    end
    
      def destroy
        location = Location.find(params[:id])
        location.destroy
        render json: LocationSerializer.new(location)
      end

      private
      def location_params
        params.require(:location).permit(:city)
      end


end

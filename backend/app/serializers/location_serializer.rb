class LocationSerializer
  include FastJsonapi::ObjectSerializer
  has_many :trails
  attributes :city

  
end

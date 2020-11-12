class TrailSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :difficulty, :location, :summary, :url
  belongs_to :location
end

class TrailSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :difficulty, :description, :image, :likes, :location
  belongs_to :location
end

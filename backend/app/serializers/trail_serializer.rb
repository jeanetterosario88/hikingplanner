class TrailSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :difficulty, :description, :image, :likes, :location
  belongs_to :location
end

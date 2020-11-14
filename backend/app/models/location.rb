class Location < ApplicationRecord

    has_many :trails
    validates :city, presence: true, uniqueness: true, length: { minimum: 3 }

end

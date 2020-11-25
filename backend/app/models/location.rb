class Location < ApplicationRecord

    has_many :trails
    validates :city, presence: true, uniqueness: true, length: { in: 6..40 }

end

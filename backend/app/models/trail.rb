class Trail < ApplicationRecord
  belongs_to :location
  has_many :notes
  validates :name, presence: true, length: { minimum: 3 }
  validates :description, presence: true, length: { minimum: 5 }


end

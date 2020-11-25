class Trail < ApplicationRecord
  belongs_to :location
  has_many :notes
  validates :name, presence: true, length: { in: 5..30 }
  validates :description, presence: true, length: { in: 10..2000 }


end

class Trail < ApplicationRecord
  belongs_to :location
  has_many :notes

  validate do
    trail_count_valid?
  end

  private
  def trail_count_valid?
    if self.location.trails.count >= 3
      self.errors.add(:trail_max, "Can't have more than 3!")
    end
end

end

end

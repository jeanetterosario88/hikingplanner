class AddTrailRefToNotes < ActiveRecord::Migration[6.0]
  def change
    add_reference :notes, :trail, null: false, foreign_key: true
  end
end

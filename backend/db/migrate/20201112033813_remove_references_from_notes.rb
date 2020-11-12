class RemoveReferencesFromNotes < ActiveRecord::Migration[6.0]
  def change
    remove_reference :notes, :trails, null: false, foreign_key: true
  end
end

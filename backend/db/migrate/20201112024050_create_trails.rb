class CreateTrails < ActiveRecord::Migration[6.0]
  def change
    create_table :trails do |t|
      t.string :name
      t.string :difficulty
      t.string :description
      t.string :image
      t.references :location, null: false, foreign_key: true

      t.timestamps
    end
  end
end

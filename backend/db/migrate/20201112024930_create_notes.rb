class CreateNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :notes do |t|
      t.string :content
      t.references :trails, null: false, foreign_key: true

      t.timestamps
    end
  end
end

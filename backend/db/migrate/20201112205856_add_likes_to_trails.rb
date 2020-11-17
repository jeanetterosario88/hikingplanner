class AddLikesToTrails < ActiveRecord::Migration[6.0]
  def change
    add_column :trails, :likes, :integer, default: 0
  end
end

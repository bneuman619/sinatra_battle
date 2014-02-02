class CreatePlayerCoords < ActiveRecord::Migration
  def change
    create_table :player_coords do |t|
      t.integer :player_ship_id
      t.integer :coord
      t.integer :hit
    end
  end
end

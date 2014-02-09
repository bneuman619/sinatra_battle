class CreatePlayerShips < ActiveRecord::Migration
  def change
    create_table :player_ships do |t|
      t.integer :player_id
      t.integer :ship_id
      t.boolean :sunk, default: false
    end
  end
end
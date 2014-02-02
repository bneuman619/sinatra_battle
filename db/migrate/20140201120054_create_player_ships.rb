class CreatePlayerShips < ActiveRecord::Migration
  def change
    create_table :player_ships do |t|
      t.integer :player_id
      t.integer :ship_id
    end
  end
end
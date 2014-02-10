class CreateGuesses < ActiveRecord::Migration
  def change
    create_table :guesses do |t|
      t.integer :player_id
      t.integer :coord
      t.boolean :hit
      t.integer :ship_id
      t.timestamps
    end
  end
end

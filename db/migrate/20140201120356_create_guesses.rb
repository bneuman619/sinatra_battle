class CreateGuesses < ActiveRecord::Migration
  def change
    create_table :guesses do |t|
      t.integer :player_id
      t.integer :coord
      t.boolean :hit
      t.timestamps
    end
  end
end

class PlayerCoord < ActiveRecord::Base
  belongs_to :player 
  belongs_to :ship, class_name: "PlayerShip", foreign_key: :player_ship_id
end
class PlayerCoord < ActiveRecord::Base
  belongs_to :player 
  belongs_to :ship, class_name: "PlayerShip", foreign_key: :player_ship_id

  def ship_name
    self.ship.ship.short_name
  end
end
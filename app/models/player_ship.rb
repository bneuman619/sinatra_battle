class PlayerShip < ActiveRecord::Base
  belongs_to :player
  belongs_to :ship
  has_many :coords, class_name: "PlayerCoord"
  # Remember to create a migration!
  def self.add_ship(ship_cfg)
    coords = ship_cfg.delete(:coords)
    ship = PlayerShip.create(ship_cfg)
    coords.each { |coord| ship.coords.create(coord: coord, ship: ship, hit: 0) }
  end
end
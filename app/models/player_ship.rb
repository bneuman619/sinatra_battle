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

  def sunk?
    enemy = self.player.game.players.find { |player| player != self.player }
    coords = self.get_coords
    Guess.where(player: enemy, coord: coords).uniq.size == 
    coords.size
  end

  # def sunk?
  #   self.update(sunk: check_sunk)
  #   self.sunk
  # end

  # def check_sunk
  #   return true if self.sunk
  #   enemy = self.player.game.players.find { |player| player != self.player }
  #   coords = self.get_coords
  #   Guess.where(player: enemy, coord: coords).uniq.size == 
  #   coords.size
  # end

  def get_coords
    self.coords.collect { |coord| coord.coord }
  end

  def name
    self.ship.name
  end
end
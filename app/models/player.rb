class Player < ActiveRecord::Base
  # has_one :game, primary_key: :game_id, foreign_key: :id
  belongs_to :user
  belongs_to :game
  has_many :ships, class_name: "PlayerShip"
  has_many :coords, through: :ships
  has_many :guesses
  # Remember to create a migration!
  def set_game(game)
    self.update(game_id: game.id)
  end

  def defense_board 
    self.coords.reduce([]) do |board, coord|
      board << {coord: coord.coord, ship: coord.ship.ship.short_name}
    end
  end

  def offense_board
    self.guesses.reduce([]) do |board, guess|
      board << {coord: guess.coord, hit: guess.hit}
    end
  end

  def log_guess(shot_coord, result)
    self.guesses.create(coord: shot_coord, hit: result)
  end

  def correct_guesses
    self.guesses.where(hit: true).collect { |guess| guess.coord }
  end

  def get_coords
    self.coords.select(:coord).collect { |coord| coord.coord }.sort
  end

  def find_ship_by_coord(coord)
    board_coord = self.coords.find_by(coord: coord)
    board_coord ? board_coord.ship : nil
  end
end

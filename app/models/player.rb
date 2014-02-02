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
    board = Array.new(100)
    self.coords.each do |coord|
      board[coord.coord] = coord.ship.ship.short_name
    end
    board
  end

  def offense_board
    board = Array.new(100)
    self.guesses.each do |guess|
      board[guess.coord] = guess.hit
    end
    board
  end
end

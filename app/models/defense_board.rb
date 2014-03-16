class DefenseBoard
  attr_reader :player
  def initialize(player, enemy=nil)
    @player = player
    @enemy = enemy
  end

  def board_data
    {board: coords,
     enemy_guesses: correct_guesses(@enemy)
    }
  end

  def coords
    @player.coords.map { |coord| parse_coord(coord) }
  end

  def parse_coord(coord)
    {
      ship_name: coord.ship_name,
      coord: coord.coord
    }
  end

  def correct_guesses(enemy)
    player.guesses.where(hit: true).map { |guess| guess.coord }
  end
end
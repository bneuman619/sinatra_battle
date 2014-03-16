class DefenseBoard
  attr_reader :player
  def initialize(player)
    @player = player
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

  # def enemy_hits
  #   @player.game.players.reject { |p| p == @player }.first.correct_guesses
  # end

  def correct_guesses(enemy)
    player.guesses.where(hit: true).map { |guess| guess.coord }
  end
end
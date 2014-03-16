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
end
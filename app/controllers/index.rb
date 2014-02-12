get '/' do
  erb :index
end

get '/offense_board' do
  build_offense_board
end

get '/defense_board' do
  build_defense_board
end

get '/player1' do
  session[:player_id] = 1
  set_game_id
  set_enemy_id
  session.inspect
end

get '/player2' do
  session[:player_id] = 2
  set_game_id
  set_enemy_id
  session.inspect
end

get '/cookie' do
  session.inspect
end

get '/check_turn' do
  my_turn?.to_s
end

post '/shoot' do
  shot_coord = params["coord"].to_i
  return 'false' if already_shot?(shot_coord)
  shot_results = get_shot_results(shot_coord)
  guess = shot_results[:guess]
  ship = shot_results[:ship]
  if ship
    {coord: guess.coord,
     hit: guess.hit,
     sunk: ship.sunk?,
     name: ship.name
     }.to_json
  else
    {coord: guess.coord,
      hit: guess.hit,
      sunk: false}.to_json
    end
end

class Ship
  attr_reader :name
  def initialize(name)
    @name = name
  end

  def sunk?
    true
  end
end

class Coordinate
  attr_reader :coordinate, :ship
  def initialize(coordinate, ship)
    @coordinate=coordinate
    @ship = ship
  end

  def hit
    true
  end
end

class Gluess
  def initialize(player, coordinate)
    @player = player
    @coordinate = coordinate
  end

  def hit?
    @coordinate.hit
  end

  def coordinate
    @coordinate.coordinate
  end

  def ship
    @coordinate.ship
  end
end

class LatestTurnResult
  attr_reader :latest_guess, :guess
  def initialize(game)
    @game = game
    @guess = @game.get_last_guess
  end

  def hit?
    @guess.hit?
  end

  def coord
    @guess.coordinate
  end

  def ship
    @guess.ship
  end
end

class Glame
  def initialize
    @guesses = [Gluess.new(1, Coordinate.new(1, Ship.new('foo')))]
  end
  def get_last_guess
    @guesses[-1]
  end
end

def parse_turn_result(turn_result)
  {coord: turn_result.coord,
   hit: turn_result.hit?,
   ship: {name: turn_result.ship.name,
          sunk: turn_result.ship.sunk?}}.to_json
  # turn_result.ship.to_json
end

get '/opponent_turn_results' do
  game = Glame.new
  turn_result = LatestTurnResult.new(game)
  parse_turn_result(turn_result)
  # parse_turn_result(LatestTurnResult.new(1))
  # latest_guess = get_latest_guess
  # return "false" if latest_guess.nil?
  # return "false" if latest_guess.player == get_player
  # ship = get_player.find_ship_by_coord(latest_guess.coord)
  # if ship
  #   {coord: latest_guess.coord, 
  #    hit: latest_guess.hit, 
  #    sunk: ship.sunk?,
  #    name: ship.name}.to_json
  # else
  #   {coord: latest_guess.coord,
  #    hit: latest_guess.hit,
  #    sunk: false}.to_json
  # end
end

get '/check_game_over' do
  if won?
    "1"
  elsif lost?
    "2"
  else
    "0"
  end
end


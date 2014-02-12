get '/' do
  @player = Player.find_by(:id => session[:player_id])
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
  shot_result = log_shot_result(shot_coord)
  parse_shot_result(shot_result)
end



class LatestTurnResult
  attr_reader :latest_guess
  def initialize(game_id)
    @latest_guess = Guess.where(id: game_id).last
  end

  def turn_over?
    !(@latest_guess.nil? || @latest_guess.player == get_player)
  end

  def hit
    @latest_guess.hit
  end
end

get '/opponent_turn_result' do

  parse_shot_result(LatestTurnResult.new(1))

  # latest_guess = get_latest_guess
  # return "false" if latest_guess.nil?
  # return "false" if latest_guess.player == get_player
  # parse_shot_result(latest_guess)
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


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
  shot_result = log_shot_result(shot_coord)
  parse_shot_result(shot_result)
end

get '/opponent_turn_results' do
  latest_guess = get_latest_guess
  return "false" if latest_guess.nil?
  return "false" if latest_guess.player == get_player
  parse_shot_result(latest_guess)
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


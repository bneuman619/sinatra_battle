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
  shot_result = check_shot(shot_coord)
  get_player.log_guess(shot_coord, shot_result)
  {result: shot_result, coord: shot_coord}.to_json
end

get '/opponent_turn_results' do
  latest_guess = get_latest_guess
  return "false" if latest_guess.nil?

  if latest_guess.player == get_player
    "false"
  else
    latest_guess.to_json
  end
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


get '/' do
  erb :index
end

get '/offense_board' do
  player = get_player
  offense_board = player.offense_board
  offense_board.to_json
end

get '/defense_board' do
  player = get_player
  defense_board = player.defense_board
  defense_board.to_json
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

get '/start_game' do
  if my_turn?
    "0"
  else
    "1"
  end
end

post '/shoot' do
  player = get_player
  enemy = get_enemy
  shot_coord = get_shot_coord
  result = check_shot(shot_coord, enemy)
  player.log_guess(shot_coord, result)
  end_turn
  result ? "1" : "0"
end

get '/check_for_shot' do
  player = get_player
  (new_enemy_guess?).to_s
end

get '/get_latest_shot' do
  guess = get_last_enemy_guess
  {coord: guess.coord, hit: guess.hit}.to_json
end

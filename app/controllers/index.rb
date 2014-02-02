get '/' do
  erb :index
end

get '/defense_board' do
  player = Player.first
  defense_board = player.defense_board
  defense_board.to_json
end

post '/shoot' do
  player = get_player
  enemy = get_enemy
  shot_coord = get_shot_coord
  result = check_shot(shot_coord, enemy)
  player.log_guess(shot_coord, result)
  result ? "1" : "0"
end

get '/player1' do
  session[:player_id] = 1
  set_enemy_id
  reset_last_guess(get_last_enemy_guess)
  session.inspect
end

get '/player2' do
  session[:player_id] = 2
  set_enemy_id
  reset_last_guess(get_last_enemy_guess)
  session.inspect
end

get '/start_game' do
  if session[:player_id] == 1
    "0"
  else
    "1"
  end
end

get '/wait_for_shot' do
  player = get_player
  if new_enemy_guess?
    guess = get_last_enemy_guess
    reset_last_guess(guess)
    {coord: guess.coord, hit: guess.hit}.to_json

  else
    {}.to_json
  end
end
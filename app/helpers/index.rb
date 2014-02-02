helpers do
  def get_player
    Player.find(session[:player_id])
  end

  def set_enemy_id
    player = get_player
    session[:enemy_id] = player.game.players.find { |p| p != player }.id 
  end

  def set_game_id
    session[:game_id] = get_player.game.id
  end

  def get_enemy
    Player.find(session[:enemy_id])
  end

  def new_enemy_guess?
    last_guess = get_last_enemy_guess
    last_guess.id > session[:last_enemy_guess_id]
  end

  def get_last_enemy_guess
    Guess.where(player_id: session[:enemy_id]).last
  end

  def reset_last_guess(guess)
    session[:last_enemy_guess_id] = guess.id
  end

  def get_shot_coord
    params[:coord][2..-1].to_i
  end

  def check_shot(shot_coord, enemy)
    enemy.coords.any? { |coord| shot_coord == coord.coord.to_i }
  end
end


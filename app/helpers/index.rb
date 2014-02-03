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

  def get_current_game
    Game.find(session[:game_id])
  end

  def new_enemy_guess?
    latest_guess = get_latest_guess
    latest_guess ? (get_latest_guess.player == get_enemy) : false
  end

   def get_latest_guess
    get_current_game.get_guesses[-1]
  end

  def get_last_enemy_guess
    Guess.where(player_id: session[:enemy_id]).order(id: :desc).first
  end

  def get_shot_coord
    params[:coord][2..-1].to_i
  end

  def check_shot(shot_coord, enemy)
    enemy.coords.any? { |coord| shot_coord == coord.coord.to_i }
  end

  def my_turn?
    get_current_game.current_player == get_player
  end

  def end_turn
    get_current_game.current_player = get_enemy
  end
end
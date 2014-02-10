helpers do
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

  def build_defense_board
    board = get_player.defense_board
    enemy_guesses = get_enemy.correct_guesses
    {board: board, enemy_guesses: enemy_guesses}.to_json
  end

  def build_offense_board
    get_player.offense_board.to_json
  end
end

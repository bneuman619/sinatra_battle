helpers do
  def won?
    correct_guesses = get_player.correct_guesses
    get_enemy.get_coords.all? do |enemy_coord|
      correct_guesses.include? enemy_coord
    end
  end

  def lost?
    enemy_guesses = get_enemy.correct_guesses
    get_player.get_coords.all? do |player_coord|
      enemy_guesses.include? player_coord
    end
  end

  def get_player
    Player.find(session[:player_id])
  end
end

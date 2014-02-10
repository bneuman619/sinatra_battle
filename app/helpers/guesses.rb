helpers do
  def get_guesses
    player_ids = get_current_game.player_ids
    Guess.where(player_id: player_ids)
  end

  def get_latest_guess
    get_guesses.last
  end

  def already_shot?(shot_coord)
    !(Guess.find_by(coord: shot_coord, player_id: session[:player_id]).nil?)
  end

  def my_turn?
    latest_guess = get_latest_guess
    if latest_guess.nil?
      get_player == get_current_game.player1
    else
      get_latest_guess.player != get_player
    end
  end
end

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

  def get_guesses
    player_ids = get_current_game.player_ids
    Guess.where(player_id: player_ids)
  end

  def get_latest_guess
    get_guesses.last
  end

  def my_turn?
    latest_guess = get_latest_guess
    if latest_guess.nil?
      get_player == get_current_game.player1
    else
      get_latest_guess.player != get_player
    end
  end

  def get_shot_coord
    params[:coord][2..-1].to_i
  end

  def get_nil_ship
    Struct.new {
    def sunk
      false
    end

    def name
      ""
    end
    }
  end

  def log_shot_result(shot_coord)
    ship_id = get_enemy.find_ship_id_by_coord(shot_coord)
    hit = (ship_id == 0 ? false : true)
    get_player.log_guess(coord: shot_coord,
                         hit: hit,
                         ship_id: ship_id)

  end

  def parse_shot_result(shot_result)
    if shot_result.hit
      ship = PlayerShip.find(shot_result.ship_id)
      {coord: shot_result.coord,
       hit: shot_result.hit,
       sunk: ship.sunk?,
       name: ship.name}.to_json
    else
      shot_result.to_json
    end
  end

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

  def build_defense_board
    board = get_player.defense_board
    enemy_guesses = get_enemy.correct_guesses
    {board: board, enemy_guesses: enemy_guesses}.to_json
  end

  def build_offense_board
    get_player.offense_board.to_json
  end

  def already_shot?(shot_coord)
    !(Guess.find_by(coord: shot_coord, player_id: session[:player_id]).nil?)
  end


end

helpers do
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

  def log_shot_result(shot_coord)
    ship_id = get_enemy.find_ship_id_by_coord(shot_coord)
    hit = (ship_id == 0 ? false : true)
    get_player.log_guess(coord: shot_coord,
                         hit: hit,
                         ship_id: ship_id)

  end
end

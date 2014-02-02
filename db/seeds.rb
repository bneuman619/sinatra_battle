User.create(name: "Fool", type: "Computer")
User.create(name: "Ben", type: "Human")

[
    {name: "Submarine", short_name: "S1", length: 1},
    {name: "Submarine", short_name: "S2", length: 1},
    {name: "Destroyer", short_name: "D1", length: 2},
    {name: "Destroyer", short_name: "D2", length: 2},
    {name: "Cruiser", short_name: "Cr", length: 3},
    {name: "Battleship", short_name: "B ", length: 4},
    {name: "Carrier", short_name: "Ca", length: 5},
].each do |conf|
  Ship.create(conf)
end

p1 = Player.create(user_id: 1)
p2 = Player.create(user_id: 2)
g = Game.create(player1: p1, player2: p2)
p1.set_game(g)
p2.set_game(g)

ship_cfg1 = {ship_id: 5, coords: [23, 24, 25], player: p1}
ship_cfg2 = {ship_id: 6, coords: [33, 34, 35, 36], player: p1}
p1.ships.add_ship(ship_cfg1)
p1.ships.add_ship(ship_cfg2)

ship_cfg3 = {ship_id: 5, coords: [23, 33, 43], player: p2}
ship_cfg4 = {ship_id: 6, coords: [17, 27, 37, 47], player: p2}
p2.ships.add_ship(ship_cfg3)
p2.ships.add_ship(ship_cfg4)
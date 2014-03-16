require_relative 'spec_helper'

describe DefenseBoard do
  before {
    Player.destroy_all
    Game.destroy_all
    @player = Player.create(user_id: 1, game_id: 1)
  }

  it "takes an argument, sets arg to player attribute" do
    expect(DefenseBoard.new(Player.first).player).to eq Player.first
  end

  it "builds hash for occupied coord for player" do
    occupied_coord = PlayerCoord.create(player: @player, player_ship_id: 1)
    occupied_coord.stub(:ship_name) { "Destroyer" }
    occupied_coord.stub(:coord) { 32 }
    board = DefenseBoard.new(@player)
    expect(board.parse_coord(occupied_coord))
    .to eq({ship_name: "Destroyer",
            coord: 32})
  end

  it "returns array of coords" do
    occupied_coord = PlayerCoord.create(player: @player, player_ship_id: 1)
    occupied_coord.stub(:ship_name) { "Destroyer" }
    occupied_coord.stub(:coord) { 32 }
    occupied_coord2 = PlayerCoord.create(player: @player, player_ship_id: 1)
    occupied_coord2.stub(:ship_name) { "Cruiser" }
    occupied_coord2.stub(:coord) { 42 }
    occupied_coord3 = PlayerCoord.create(player: @player, player_ship_id: 1)
    occupied_coord3.stub(:ship_name) { "Carrier" }
    occupied_coord3.stub(:coord) { 52 }
    @player.stub(:coords) { [occupied_coord, occupied_coord2, occupied_coord3]}
    
    expect(DefenseBoard.new(@player).coords).to eq(
      [{ship_name: "Destroyer", coord: 32},
       {ship_name: "Cruiser", coord: 42},
       {ship_name: "Carrier", coord: 52}])
  end

  it "finds correct guesses for a player" do
    guess1 = @player.guesses.create(coord: 34, hit: true)
    guess2 = @player.guesses.create(coord: 44, hit: true)
    guess3 = @player.guesses.create(coord: 54, hit: false)
    defense_board = DefenseBoard.new(@player)
    expect(defense_board.correct_guesses(@player).sort).
    to eq([34, 44].sort)
  end

  it "looks up the enemy" do
    player2 = Player.create(user_id: 2, game_id: 1)
    game = Game.create(id: 1, player1_id: 1, player2_id: 2)
    @player.game.stub(:players) { [@player, player2] }
    defense_board = DefenseBoard.new(@player)
    expect(defense_board.get_enemy).to eq(player2)
  end
end
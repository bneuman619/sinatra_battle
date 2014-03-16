require_relative 'spec_helper'

describe DefenseBoard do
  before {
    @player = Player.create(user_id: 1, game_id: 1)
  }

  it "takes an argument, sets arg to player attribute" do
    expect(DefenseBoard.new(Player.first).player).to eq Player.first
  end

  it "builds hash for occupied coord for player" do
    occupied_coord = PlayerCoord.create(player_id: 1)
    occupied_coord.stub(:ship_name) { "Destroyer" }
    occupied_coord.stub(:coord) { 32 }
    expect(DefenseBoard.new(Player.first).coords.first)
    .to eq({ship_name: "Destroyer",
            coord: 32})
  end
end
require_relative 'spec_helper'

describe DefenseBoard do
  before {
    @player = Player.create(user_id: 1, game_id: 1)
  }

  it "takes an argument, sets arg to player attribute" do
    expect(DefenseBoard.new(Player.first).player).to eq Player.first
  end
end
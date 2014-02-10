class Guess < ActiveRecord::Base
  belongs_to :player
  belongs_to :ship, class_name: "PlayerShip"
  validates :coord, uniqueness: { scope: :player_id }
  # Remember to create a migration!
end

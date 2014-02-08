class Guess < ActiveRecord::Base
  belongs_to :player
  validates :coord, uniqueness: { scope: :player_id } 
  # Remember to create a migration!
end

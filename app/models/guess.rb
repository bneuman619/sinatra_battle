class Guess < ActiveRecord::Base
  belongs_to :player
  # validates :coord, uniqueness: { scope: :player_id } 
  # Remember to create a migration!

  def hit
    coordinate.have_ship?
  end

  def coord
    coordinate.coord
  end
end

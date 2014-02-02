class Guess < ActiveRecord::Base
  belongs_to :player
  # Remember to create a migration!
end

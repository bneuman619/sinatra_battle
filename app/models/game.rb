class Game < ActiveRecord::Base
  belongs_to :player1, class_name: "Player", foreign_key: :player1_id
  belongs_to :player2, class_name: "Player", foreign_key: :player2_id
  belongs_to :current_player, class_name: "Player", foreign_key: :current_player_id
  
  def players
    [player1, player2]
  end

  def player_ids
    [player1.id, player2.id]
  end

  def guesses
    Guess.where(player_id: [self.player1.id, self.player2.id])
  end

  def get_last_guess
    guesses.last 
  end
end
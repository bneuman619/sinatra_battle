function Game() {
  this.new_turn = function() { 
    return new Turn();
  }

  that = this;
  this.turn = that.new_turn();
  this.over = false;
  this.interval = null;

  

  this.next_turn = function() {
    that.turn.turn.render();
    this.turn = that.new_turn();
  }


  this.check_turn = function() {
    
    if(this.turn.turn.done) {
      console.log("done!");
      that.next_turn();
    }

    else if(this.over) {
      clearInterval(that.interval)
    }
  }

  
}

function game_logic() {
  game = new Game();
  game.interval = setInterval(game.check_turn, 5000);
  return game;
}
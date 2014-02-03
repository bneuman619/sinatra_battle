function Game() {
  this.new_turn = function() { 
    return new Turn();
  }

  that = this;
  this.turn = this.new_turn();
  this.over = false;
  this.next_turn_please = false;
  this.interval =  null;
  
  this.next_turn = function() {
    that.turn.turn.render();
    that.turn = that.new_turn();
  }

  this.check_turn = function check_turn() {
    console.log("Check turn...");
    if(that.turn.turn.done) {
      console.log("done!");
      that.next_turn();
    }

    else if(that.over) {
      clearInterval(that.interval)
    }
  }

  
  
}

function game_logic() {
  game = new Game();
  game.interval = setInterval(check_turn, 5000);

  function check_turn() {
    if(game.turn.turn.done) {
      console.log("done....");
      game.next_turn_please = true;
    }

    else {
      console.log("not done...");
    }
  }

  return game;
}
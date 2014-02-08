function Game() {

  this.turn = new Turn();
  this.over = false;
  this.won = null;
 
  this.turn_over_listener = function() {
    var that = this;
    $(document).on("turn_over", function(event) {
      console.log("turn over!");
      that.end_turn();
    })
  }

  this.turn_over_listener();
}

Game.prototype.end_turn = function () {
  $.ajax({
    url: "/check_game_over",
    cache: false,
    context: this,
    dataType: 'json',
    success: this.parse_game_over_response,
    type: "GET"
  }).done(this.next_turn)
}

Game.prototype.next_turn = function () {
  if (this.over) {
    if (this.won) {
      alert("Game over. You won");
    }

    else {
      alert("Game over. You lost.");
    }
  }

  else {
    this.turn.next_turn();
  }
}

Game.prototype.parse_game_over_response = function (response) {
  console.log("Checking game over");
  if (response) {
    console.log("Game is over");
    console.log(response);
    this.over = true;
    if (response == 1) {
      this.won = true;
    }

    else {
      this.lost = true;
    }
  }

  else {
    console.log("game not over");
  }
}


//this.turn_over_listener.bind(this) seemed to work before
//IT DOES NOT WORK NOW
//why?

//var that = this; that.turn.next_turn does not seem to work if
//I do Game.prototype.turn_over_listener
//WHY?

//turn_over_listener seems to work JUST FINE at global leve
//WHY?

//How do #3 and #1 relate?
//#1 is a different scope than we were a little while ago.
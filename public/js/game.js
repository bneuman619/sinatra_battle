function Game() {

  this.turn = new Turn();
 
  this.turn_over_listener = function() {
    var that = this;
    $(document).on("turn_over", function(event) {
      console.log("turn over!");
      that.turn.next_turn();
    })
  }

   this.turn_over_listener();
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
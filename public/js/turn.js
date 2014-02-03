function Turn() {
  this.turn = null;
  that = this;

  this.check_turn = function check_turn() {
    console.log("before ajax");
    $.ajax({
      url: "/start_game",
      cache: false,
      success: that.log_turn,
      type: "GET"
      })
    console.log("after ajax");
  }

  that.log_turn = function log_turn(turn) {
    console.log("In log turn");
    console.log("turn");
    if(turn === "0") {
      that.turn = start_offense_turn();
    }

    else {
      that.turn = start_defense_turn();
    }
  }

  this.check_turn();
}

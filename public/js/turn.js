function Turn() { 

  this.turn = null;
  this.set_turn();

}

Turn.prototype.offense_turn = function () {
  this.turn = new OffenseTurn();
}

Turn.prototype.defense_turn = function () {
  this.turn = new DefenseTurn();
}

Turn.prototype.set_turn = function () {
  $.ajax({
    url: "/start_game",
    cache: false,
    context: this,
    success: function (res) {
      if (res == "0") {
        this.defense_turn();
      }

      else {
        this.offense_turn();
      }
    },
    type: "GET"
  })
}

Turn.prototype.next_turn = function() {

  if (this.turn.constructor.name == "DefenseTurn") {
    this.offense_turn();
  }

  else if (this.turn.constructor.name == "OffenseTurn") {
    this.defense_turn();
  }
}

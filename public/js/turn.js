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
    url: "/check_turn",
    cache: false,
    context: this,
    dataType: 'json',
    success: function (my_turn) {
      if (my_turn) {
        this.offense_turn();
      }

      else {
        this.defense_turn();
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

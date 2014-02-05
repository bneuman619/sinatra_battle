

function OffenseTurn() {

  this.done = false;
  this.result = null;
  this.coord = null;
  var that = this;

  this.shoot = function (clicked_coord) {
    event.preventDefault();
    console.log(event);
    that.coord = event.target;

    $.post("/shoot", {coord: that.coord.id}, that.log_shot_result).done(that.end_turn.bind(that));
  }

  this.log_shot_result = function (result) {
    console.log(result);
    if(result == "0") {
      this.result = false;

    }

    else {
      this.result = true;
    };
  }

   this.trigger_end = function () {
    console.log("in trigger end");
    $(document).trigger("turn_over", [this.done, this.result]);
  }

  this.render = function () {
    new OffenseResultsView(this.coord, this.result).render();
  }

  this.end_turn = function () {
    console.log("In end turn");
    this.render();
    console.log("Rendered");
    this.trigger_end();
  }
}

function OffenseResultsView(coord, result) {
  this.coord = coord;
  this.results = result;
}

OffenseResultsView.prototype.generate_results_string = function () {
  string = "You shot at " + this.coord.id + " and ";
  if (this.result) {
    string += "hit";
  }

  else {
    string += "miss";
  }

  return string
}

OffenseResultsView.prototype.print_string = function () {
  result_string = this.generate_results_string();
  $("#off_results").show().html(result_string);
}


OffenseResultsView.prototype.mark_board = function () {
  if (this.result) {
    $(this.coord).removeClass("empty").addClass("hit");
  }

  else {
    $(this.coord).removeClass("empty").addClass("miss");
  }
}

OffenseResultsView.prototype.render = function () {
  this.mark_board();
  this.print_string();
}

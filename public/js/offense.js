

function OffenseTurn() {

  this.done = false;
  this.result = null;
  var that = this;

  this.shoot = function (clicked_coord) {
    event.preventDefault();
    console.log(event);
    coord = event.target.id.substr(2);

    $.post("/shoot", {coord: coord}, that.log_shot_result).done(that.end_turn.bind(that));
  }

  this.log_shot_result = function (result) {
    that.result = $.parseJSON(result);
  }

  this.trigger_end = function () {
    console.log("in trigger end");
    $(document).trigger("turn_over", [this.done, this.result]);
  }

  this.render = function () {
    new OffenseResultsView(this.result).render();
  }

  this.end_turn = function () {
    console.log("In end turn");
    this.render();
    console.log("Rendered");
    this.trigger_end();
  }
}

function OffenseResultsView(result) {
  this.coord = result.coord;
  this.result = result.result;
}

OffenseResultsView.prototype.generate_results_string = function () {
  var string = "You shot at " + this.coord + " and ";
  if (this.result) {
    string += "hit";
  }

  else {
    string += "miss";
  }

  return string
}

OffenseResultsView.prototype.print_string = function () {
  var result_string = this.generate_results_string();
  $("#off_results").show().html(result_string);
}

OffenseResultsView.prototype.generate_coord_selector = function () {
  return "#oc" + this.coord;
}

OffenseResultsView.prototype.mark_board = function () {
  var selector = this.generate_coord_selector();

  if (this.result) {
    $(selector).removeClass("empty").addClass("hit");
  }

  else {
    $(selector).removeClass("empty").addClass("miss");
  }
}

OffenseResultsView.prototype.render = function () {
  this.mark_board();
  this.print_string();
}

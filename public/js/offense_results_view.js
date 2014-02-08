function OffenseResultsView(result) {
  console.log(result);
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

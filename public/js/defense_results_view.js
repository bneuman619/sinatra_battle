function DefenseResultsView(result) {
  console.log(result);
  this.coord = result.coord;
  this.result = result.hit;
}

DefenseResultsView.prototype.generate_results_string = function () {
  var string = "Opponent shot at " + this.coord + " and ";
  if (this.result) {
    string += "hit";
  }

  else {
    string += "missed";
  }

  return string;
}

DefenseResultsView.prototype.print_string = function () {
  var result_string = this.generate_results_string();
  $("#def_results").show().html(result_string);
}

DefenseResultsView.prototype.generate_coord_selector = function () {
  return "#dc" + this.coord;
}

DefenseResultsView.prototype.mark_board = function () {
  var selector = this.generate_coord_selector();

  if (this.result) {
    $(selector).addClass("hit");
  }

  else {
    $(selector).removeClass("empty").addClass("miss");
  }
}

DefenseResultsView.prototype.render = function () {
  this.mark_board();
  this.print_string();
}
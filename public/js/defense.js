function DefenseTurn() {

  this.result = null;
  this.interval = setInterval(this.listen_for_shot.bind(this), 5000);
  this.start_up();

}

DefenseTurn.prototype.start_up = function () {
  $(".coord").off();
  $(".coord").on("click", function () { event.preventDefault(); })
}

DefenseTurn.prototype.listen_for_shot = function () {
  console.log("Checking the shot");
  $.ajax({
      url: "/opponent_turn_results",
      cache: false,
      context: this,
      success: this.process_check_shot,
      dataType: 'json',
      type: "GET"
   })
}

DefenseTurn.prototype.process_check_shot = function (result) {
  if (result) {
    this.result = result;
    this.end_turn();
  }

  else {
    console.log("NO NEW SHOT");
  }
}

DefenseTurn.prototype.end_turn = function () {
  clearInterval(this.interval);
  this.trigger_end();
  this.render();
}


DefenseTurn.prototype.trigger_end = function() {
  $(document).trigger("turn_over", [this.done, this.result]);
}

DefenseTurn.prototype.render = function () {
  view = new DefenseResultsView(this.result);
  view.render();
}
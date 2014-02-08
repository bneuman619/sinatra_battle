function OffenseTurn() {

  this.result = null;
  this.set_click_listener();
}

OffenseTurn.prototype.set_click_listener = function () {
  $(".coord").off();
  $(".coord").on("click", function () { event.preventDefault() });
  $("#oboard .coord.empty").on("click", this.shoot.bind(this));
}

OffenseTurn.prototype.shoot = function (clicked_coord) {
  event.preventDefault();
  console.log(event);
  coord = event.target.id.substr(2);
  $.ajax({
    url:"/shoot",
    data: {coord: coord},
    context: this,
    success: this.end_turn,
    type: 'POST',
    dataType: 'json'
    });
  }

OffenseTurn.prototype.trigger_end = function () {
  $(document).trigger("turn_over", [this.done, this.result]);
}

OffenseTurn.prototype.end_turn = function (result) {
  console.log("RESULT" + result);
  if (result) {
    this.result = result;
    this.trigger_end();
    this.render();
  }
}

OffenseTurn.prototype.render = function () {
  new OffenseResultsView(this.result).render();
}

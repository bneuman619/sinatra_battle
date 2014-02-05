function OffenseTurn() {

  this.result = null;
  this.set_click_listener();
}

OffenseTurn.prototype.set_click_listener = function () {
  $(".coord").off();
  $(".coord").on("click", this.shoot.bind(this));
}

OffenseTurn.prototype.log_shot_result = function (result) {
  this.result = result;
}

OffenseTurn.prototype.shoot = function (clicked_coord) {
  event.preventDefault();
  console.log(event);
  coord = event.target.id.substr(2);
  $.ajax({
    url:"/shoot",
    data: {coord: coord},
    context: this,
    success: this.log_shot_result,
    type: 'POST',
    dataType: 'json'
    }).done(this.end_turn);
  }

OffenseTurn.prototype.trigger_end = function () {
  $(document).trigger("turn_over", [this.done, this.result]);
}

OffenseTurn.prototype.end_turn = function () {
  console.log(this);
  this.trigger_end();
  this.render();
}

OffenseTurn.prototype.render = function () {
  new OffenseResultsView(this.result).render();
}

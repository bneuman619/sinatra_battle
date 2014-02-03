

function OffenseTurn() {
  show_oboard();
  
  this.done = false;
  this.result = null;
  this.coord = null;
  that = this;
 
 
  this.shoot = function shoot(clicked_coord) {
    event.preventDefault();
    console.log(event);
    that.coord = event.target;

    $.post("/shoot", {coord: that.coord.id}, that.log_shot_result).done(that.mark_done);
  }

  this.log_shot_result = function log_shot_result(result) {
    console.log(result);
    if(result == "0") {
      that.result = false;
     
    }

    else {
      that.result = true;
    };
  }

  this.render = function render() {
    if (this.result == true) {
      that.mark_hit(that.coord);
    }

    else {
      that.mark_miss(that.coord)
    }
  }

  this.mark_done = function mark_done() {
    that.done = true;
  }

  this.mark_miss = function mark_miss(coord_id) {
    $(coord_id).removeClass("empty").addClass("miss");
  }

  this.mark_hit = function mark_hit(coord_id) { 
    $(coord_id).removeClass("empty").addClass("hit");
  }
}

function start_offense_turn() {
  turn = new OffenseTurn();
  $(".coord").off();
  $(".coord").on("click", turn.shoot);
  return turn;
}

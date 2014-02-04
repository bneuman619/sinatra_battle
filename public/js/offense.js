

function OffenseTurn() {
  show_oboard();
  
  this.done = false;
  this.result = null;
  this.coord = null;
  that = this;
 
 
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

  this.render = function () {
    if (this.result == true) {
      this.mark_hit(that.coord);
    }

    else {
      this.mark_miss(that.coord)
    }
  }

  this.trigger_end = function () { 
    console.log("in trigger end");
    $(document).trigger("turn_over", [this.done, this.result]);
  }


  this.mark_done = function () {
    this.done = true;
    
  }

  this.mark_miss = function (coord_id) {
    $(coord_id).removeClass("empty").addClass("miss");
  }

  this.mark_hit = function (coord_id) { 
    $(coord_id).removeClass("empty").addClass("hit");
  }

  this.end_turn = function () {
    console.log("In end turn");
    this.render();
    console.log("Rendered");
    this.mark_done();
    console.log("marked done");
    this.trigger_end();
  }
}

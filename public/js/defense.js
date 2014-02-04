

function DefenseTurn() {

  this.check_shot = function () {
    console.log("Checking the shot");
    $.ajax({
        url: "/get_latest_shot",
        cache: false,
        success: that.process_check_shot,
        type: "GET"
     })
  }

  that = this;
  this.done = false;
  this.result = null;
  this.interval = setInterval(this.check_shot.bind(this), 5000);


  this.process_check_shot = function (result) {
    console.log(result);
    if (result == "false") {
      console.log("NO NEW SHOT");
    }

    else {
      that.result = $.parseJSON(result);
      that.end_turn();
    }
  }

  this.render = function () {
    cid = "#dc" + this.result.coord;
    result_string = "Opponent shot at " + this.result.coord + " and ";
    console.log(this.result.hit);
    if (this.result.hit) {
      $(cid).removeClass("ship").addClass("hit");
      result_string += "hit";
    }

    else {
      $(cid).removeClass("empty").addClass("miss");
      result_string += "miss";
    }

    $("#def_results").show().html(result_string);
  }

  this.mark_done = function () {
    this.done = true;
  }

  this.trigger_over = function() {
    $(document).trigger("turn_over", [this.done, this.result]);
  }

  this.end_turn = function () {
    clearInterval(this.interval);
    this.render();
    this.mark_done();
    this.trigger_over();
  }
}


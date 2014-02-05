function DefenseTurn() {

  this.check_shot = function () {
    console.log("Checking the shot");
    $.ajax({
        url: "/get_latest_shot",
        cache: false,
        //If I call the process_check_shot method this way,
        //I should be able to use 'this' within the method without a problem.
        context: this,
        success: this.process_check_shot,
        type: "GET"
     })
  }

  this.start_up = function () {
    $(".coord").off();
    $(".coord").on("click", function () { event.preventDefault(); })
  }

  var that = this;
  this.done = false;
  this.result = null;
  this.interval = setInterval(this.check_shot.bind(this), 5000);
  this.interval = setInterval(function() { that.check_shot() }, 5000);
  this.start_up();

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

  this.end_turn = function () {
    clearInterval(this.interval);
    this.render();
    this.mark_done();
    this.trigger_over();
  }

  this.mark_done = function () {
    this.done = true;
  }

  this.trigger_over = function() {
    $(document).trigger("turn_over", [this.done, this.result]);
  }


}


function DefenseResultsView(result) {
  console.log(result);
  this.coord = result.coord;
  this.result = result.hit;
}

DefenseResultsView.prototype.generate_results_string = function () {
  var string = "Opponent shot at " + this.coord + " and ";
  if (this.result.hit) {
    string += "hit";
  }

  else {
    string += "hit";
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

  if (this.result.hit) {
    $(selector).removeClass("empty").addClass("hit");
  }

  else {
    $(selector).removeClass("empty").addClass("miss");
  }
}

DefenseResultsView.prototype.render = function () {
  this.mark_board();
  this.print_string();
}


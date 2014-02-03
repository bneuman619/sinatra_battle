

function DefenseTurn() {

  show_dboard();
  
  that = this;
  this.done = false;
  this.result = null;
  this.interval = null;

  this.check_shot = function check_shot() {
    console.log("Checking the shot");
    $.ajax({
        url: "/check_for_shot", 
        cache: false,
        success: that.get_new_shot,
        type: "GET"
     })
  }

  this.get_new_shot = function get_new_shot(result) {
    console.log(result);
    if (result === "true") {
      console.log("IN IF");
      clearInterval(that.interval);
      that.retrieve_shot();
    }
  }

  that.retrieve_shot = function retrieve_shot() {
    $.ajax({
      url: "/get_latest_shot",
      cache: false,
      success: that.log_result,
      type: "GET"
    }).done(that.mark_done)
  }

  that.log_result = function log_result(result) {
    that.result = $.parseJSON(result); 
  }

  that.render = function render() {
    cid = "#dc" + that.result.coord;

    if ($(cid).hasClass("ship")) {
        $(cid).removeClass("ship").addClass("hit");
    };
  }

  that.mark_done = function mark_done() {
    that.done = true;
  }
}

function start_defense_turn() { 
  turn = new DefenseTurn();
  $(".coord").off();
  $(".coord").on("click", function () { event.preventDefault(); });
  turn.interval = setInterval(turn.check_shot, 5000)
  return turn;
}



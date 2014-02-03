

function DefenseTurn() {

  show_dboard();
  
  that = this;
  this.done = false;
  this.result = null;
  this.interval = null;

  this.check_shot = function check_shot() {
    console.log("Checking the fucking shot");
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

function Turn() {
  this.turn = null;
  that = this;

  this.check_turn = function check_turn() {
    console.log("before ajax");
    $.ajax({
      url: "/start_game",
      cache: false,
      success: that.log_turn,
      type: "GET"
      })
    console.log("after ajax");
  }

  that.log_turn = function log_turn(turn) {
    console.log("In log turn");
    console.log("turn");
    if(turn === "0") {
      that.turn = start_offense_turn();
    }

    else {
      that.turn = start_defense_turn();
    }
  }

  this.check_turn();
}

function Game() {
  that = this;
  this.over = false;
  this.turn = new_turn;
  this.interval = null;
  

  this.new_turn = function() { 
    that.turn = new Turn();
  }

  this.next_turn = function() {
    that.turn.render();
    that.new_turn();
  }


  this.check_turn = function() {
    if(that.turn.done()) {
      that.next_turn();
    }

    else if(that.over) {
      clearInterval(that.interval)
    }
  }
}

function game_logic() {
  game = new Game();
  game.interval = setInterval(game.check_turn, 5000);
}
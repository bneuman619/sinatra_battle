function Game() {

  that = this;
  this.turn = null;
  this.current_turn = "0";
  this.over = false;
  this.next_turn_please = false;

  this.next_turn = function() {
    console.log("next turn...");
    that.turn.render();
    that.turn = this.new_turn();
  }

}


game = new Game();
startup_set_turn();
interval = setInterval(more_stuff_to_do, 5000);
turns = {"0": "DefenseTurn", "1" : "OffenseTurn"};

function more_stuff_to_do() {
  if (game.turn.done) {
    console.log("turn done");
    if (game.turn.constructor.name == "DefenseTurn") {
      clearInterval(game.turn.interval);
      game.turn.render();
      game.turn = new OffenseTurn();
      $(".coord").off();
      $(".coord").on("click", game.turn.shoot);
    }

    else if (game.turn.constructor.name == "OffenseTurn") {
      game.turn.render();
      game.turn = new DefenseTurn();
      $(".coord").off();
      $(".coord").on("click", function () { event.preventDefault(); });
      game.turn.interval = setInterval(game.turn.check_shot, 5000);
    }
  }

  else {
    console.log("Turn not done yet");
  }
}

function startup_set_turn() {
  $.ajax({
    url: "/start_game",
    cache: false,
    success: function (res) {
      if (res == "0") {
        console.log("on defense");
        game.turn = new DefenseTurn();
        console.log(game.turn);
        $(".coord").off();
        $(".coord").on("click", function () { event.preventDefault(); });
        game.turn.interval = setInterval(game.turn.check_shot, 5000);
      }

      else {
        console.log("on offense");
        game.turn = new OffenseTurn();
        console.log(game.turn);
        $(".coord").off();
        $(".coord").on("click", game.turn.shoot);
      }
    },
    type: "GET"
    })
  console.log("after ajax");
 }


// interval = setInterval(stuff_to_do, 5000);

// turns = {"0": "DefenseTurn", "1" : "OffenseTurn"}

// function stuff_to_do() {
//   check_current_turn();
//   change_turn_or_not();
// }

// function check_current_turn() {
//   console.log("before ajax");
//   $.ajax({
//     url: "/start_game",
//     cache: false,
//     success: function (res) { game.current_turn = res },
//     type: "GET"
//     })
//   console.log("after ajax");
//  }

// function change_turn_or_not() {
//   if (turns[game.current_turn] != game.turn.constructor.name) {
//     if (game.current_turn == "0") {
//       game.turn = new DefenseTurn();
//     }

//     else {
//       game.turn = new OffenseTurn();
//     }
//   }
// }







  // this.check_turn = function check_turn() {
  //   interval = setInterval(check, 5000);
  //   // done = that.turn.turn.done;
  //   turn = this.turn;

  //   function check() {
  //     console.log('checking');
  //     if(turn.done) {
  //       console.log("checking");
  //       next_turn();
  //       // that.next_turn();
  //     }

  //     else if(that.over) {
  //       clearInterval(that.interval)
  //     }
  //   }

  //   function next_turn() {
  //     this.next_turn()
  //   }

  // }

  // this.check_turn();


  // function check_turn() {
  //   if(game.turn.turn.done) {
  //     console.log("done....");
  //     game.next_turn_please = true;
  //   }

  //   else {
  //     console.log("not done...");
  //   }
  // }

  //   return game;
  // }

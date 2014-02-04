function Game() { 
  that = this;

  this.turn_over_listener = function() {
    $(document).on("turn_over", function(event) {
      console.log("TURN OVER!");
      this.next_turn();
    })
  }

  this.startup_set_turn = function () {
    $.ajax({
      url: "/start_game",
      cache: false,
      success: function (res) {
        if (res == "0") {
         that.start_defense_turn();
        }

        else {
         that.start_offense_turn();
        }
      },
      type: "GET"
      })
  }

  this.turn = null;
  this.startup_set_turn();
  this.turn_over_listener.bind(this);
  this.over = false;

  this.next_turn = function() {
    console.log("next turn...");

    alert("Confirm when ready to switch");
    
    if (this.turn.constructor.name == "DefenseTurn") {
      this.start_offense_turn();
    }

    else if (this.turn.constructor.name == "OffenseTurn") {
      this.start_defense_turn();
    }
  }

  this.start_offense_turn = function() { 
    this.turn = new OffenseTurn();
    $(".coord").off();
    $(".coord").on("click", this.turn.shoot);
  }

  this.start_defense_turn = function () {
    this.turn = new DefenseTurn();
    $(".coord").off();
    $(".coord").on("click", function () { event.preventDefault(); });
  }
}

game = new Game();

turn_over_listener = function() {
 $(document).on("turn_over", function(event) {
    console.log("TURN OVER!");
    game.next_turn();
  })
}

turn_over_listener();












// function more_stuff_to_do() {
//   console.log("INTERVAL!");
//   if (game.turn.done) {
//     console.log("turn done");
//     ;
//     }
//   }

//   else {
//     console.log("Turn not done yet");
//   }
// }
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

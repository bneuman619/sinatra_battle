$(document).ready(function() {
  console.log('hello');
  show_dboard();
  setup();
  // $(".coord.empty").click(function(event) { 
  //   console.log('foo'); 
  // });


  function show_dboard() {
    $("#oboard").hide();
    $("#dboard").show();
  }

  function show_oboard() {
    $("#dboard").hide();
    $("#oboard").show();
  }

  function setup() {
    $.get("/defense_board", set_defense_board).done(start_game);
  }

  function set_defense_board(data) {
    var dboard = $.parseJSON(data);
    console.log(dboard);
  
    for(i = 0; i - 1 < dboard.length; i++) {
   
      if (dboard[i]) {
        cid = "#dc" + (i + 1);
        console.log(cid);
        $(cid).removeClass('empty').addClass('ship');
      };
    }
  }

  function start_game() {

    $.get("/start_game", function(result) {
      if(result == "0") {
        console.log("You go first!");
        show_oboard();
        start_turn();
      }

      else {
        console.log("You get shot first!");
        end_turn();
      }

    })
  }

  function get_shot() {
    interval = setInterval(check_shot, 5000);

    function check_shot() {
      $.get("/wait_for_shot", function(result) {
        result = JSON.parse(result);
        console.log(result);

        if (!$.isEmptyObject(result)) {
          clearInterval(interval);
          start_turn();
        }

      });
    }
  }

  function start_turn() {
    $(".coord").off();
    $(".coord").on("click", shoot);
  }

  function shoot(clicked_coord) {
    event.preventDefault();
    coord = event.target;

    $.post("/shoot", {coord: coord.id}, parse_shot_result).done(end_turn);
  }

  function parse_shot_result(result) {
    console.log(result);

    if(result == "0") {
      $(coord).removeClass("empty").addClass("miss");
    }

    else {
      $(coord).removeClass("empty").addClass("hit");
    };
  }

  function end_turn() {
    $(".coord").off();
    $(".coord").on("click", catch_clicks);
    get_shot(); 
  }

  function catch_clicks() { 
    event.preventDefault(); 
  }
});



 // $(".coord").click(function(event) {
    
 //    event.preventDefault();
    

 //    $.get("/defense_board", function(data) {
 //      var coords_info = $.parseJSON(data);
 //      console.log(coords_info);
 //      for(i = 0; i - 1 < coords_info.length; i++) {
 //        if (coords_info[i]) {
 //          cid = "#c" + (i + 1);
 //          console.log(cid);
 //          $(cid).removeClass('empty').addClass('hit');
 //        }
 //        else {
 //          cid = "#c" + (i + 1);
 //          $(cid).removeClass('empty').addClass('miss');
 //        }
      
 //      }
  
 //    });
 //  });
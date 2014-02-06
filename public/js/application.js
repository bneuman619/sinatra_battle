$(document).ready(function() {
  console.log('hello');
  $("#dboard").show();
  $("#oboard").show();
  setup();
  game = new Game();
})



 function setup() {
  console.log("I hate JS");
    $.ajax({
      url: "/defense_board",
      cache: false,
      success: make_defense_board,
      type: "GET"
    }).done(
    
    $.ajax({
      url: "/offense_board", 
      cache: false,
      success: make_offense_board,
      type: "GET"
    })
    )
  }



function make_offense_board(coords) {
  console.log("making offense board");
  board = new OffenseBoard(coords);
  board.parse_coords();
  console.log(board.hits);
  console.log(board.misses);
  board.render();
}

function make_defense_board(coords) { 
  console.log("making defense board");
  board = new DefenseBoard(coords);
  board.parse_coords();
  console.log(board.ships);
  board.render();
}





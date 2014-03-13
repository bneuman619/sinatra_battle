$(document).ready(function() {
  $("#dboard").show();
  $("#oboard").show();
  setup();
  game = new Game();
})



function setup() {
    $.ajax({
      url: "/defense_board",
      cache: false,
      dataType: 'json',
      success: render_defense_board,
      type: "GET"
    }).done(
    
    $.ajax({
      url: "/offense_board", 
      cache: false,
      dataType: 'json',
      success: render_offense_board,
      type: "GET"
    })
    )
  }
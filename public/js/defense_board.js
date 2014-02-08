function render_defense_board(board_info) {
  var coords = board_info.board;
  var enemy_guesses = board_info.enemy_guesses;

  for (i = 0; i < coords.length; i++) {
    var coord = coords[i];
    var css_id = "#dc" + coord.coord;
    $(css_id).html(coord.ship);
    $(css_id).removeClass('empty').addClass('ship');
  }

  for (p = 0; p < enemy_guesses.length; p++) {
    var css_id = "#dc" + enemy_guesses[p];
    $(css_id).addClass('hit');
  }
}
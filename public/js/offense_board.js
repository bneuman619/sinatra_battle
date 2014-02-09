function render_offense_board(coords) {
  console.log(coords);
  for (i = 0; i < coords.length; i ++) {
    var coord = coords[i].coord
    var hit = coords[i].hit
    var css_id = "#oc" + coord

    if (hit) {
      $(css_id).removeClass("empty").addClass("hit");
    }

    else {
      $(css_id).removeClass("empty").addClass("miss");
    }
  }
}

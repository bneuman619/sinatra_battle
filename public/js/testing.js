
function ajax_tests() {
  var aja = $.get("/start_game", parse_it);

  function parse_it(data) {
    data = "SDFLJK" + data;
    return data;
  }

  return aja;
}

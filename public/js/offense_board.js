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

// function OffenseBoard(coords) {
//   this.coords = coords;
//   this.hits = [];
//   this.misses = [];
//   this.parse_coords = function parse_coords() {

//     for (i = 0; i < this.coords.length; i++) {
//       var coord = this.coords[i].coord;
//       var hit = this.coords[i].hit;
//       console.log(this.coords[i]);

//       if (hit) {
//         console.log(coord + "is a hit");
//         this.hits.push(coord);
//       }

//       else {
//         console.log(coord + "is a miss");
//         this.misses.push(coord);
//       }
//     }
//   }

//   this.render = function render() {
//     for (i = 0; i < this.hits.length; i++) {
//       var lookup = "#oc" + this.hits[i];
//       this.mark_hit(lookup);
//     }

//     for (i = 0; i < this.misses.length; i++) {
//       this.mark_miss("#oc" + this.misses[i]);
//     }
//   }

//   this.mark_miss = function mark_miss(coord_id) {
//     $(coord_id).removeClass("empty").addClass("miss");
//   }

//   this.mark_hit = function mark_hit(coord_id) { 
//     $(coord_id).removeClass("empty").addClass("hit");
//   }
// }

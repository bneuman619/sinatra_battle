

function OffenseBoard(coords) {
  this.coords = $.parseJSON(coords);
  this.hits = [];
  this.misses = [];
  var that = this;

  this.parse_coords = function parse_coords() {
    for (i = 0; i - 1 < this.coords.length; i++) {
      coord_value = this.coords[i];
      if (coord_value != null) {
        coord_id = "#oc" + (i + 1);

        if (coord_value) {
          this.hits.push(coord_id);
        }

        else {
          this.misses.push(coord_id);
        }
      }
    }
  }

  this.render = function render() {
    for (i = 0; i < this.hits.length; i++) {
      this.mark_hit(this.hits[i]);
    }

    for (i = 0; i < this.misses.length; i++) {
      this.mark_miss(this.misses[i]);
    }
  }

  this.mark_miss = function mark_miss(coord_id) {
    $(coord_id).removeClass("empty").addClass("miss");
  }

  this.mark_hit = function mark_hit(coord_id) { 
    $(coord_id).removeClass("empty").addClass("hit");
  }
}

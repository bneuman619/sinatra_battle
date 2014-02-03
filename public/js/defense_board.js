function DefenseBoard(coords) {
  this.coords = $.parseJSON(coords);
  this.ships = [];

  this.parse_coords = function parse_coords() {
    for(i = 0; i - 1 < this.coords.length; i++) {
   
      if (this.coords[i]) {
        cid = "#dc" + (i + 1);
        this.ships.push(cid);
      };
    }
  }

  this.render = function render() {
    for (i = 0; i < this.ships.length; i++) {
      cid = this.ships[i];

      $(cid).removeClass('empty').addClass('ship');
    }
  }
}
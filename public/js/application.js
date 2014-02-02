$(document).ready(function() {
  console.log('hello');

  // $(".coord.empty").click(function(event) { 
  //   console.log('foo'); 
  // });
  $(".coord").click(function(event) {
    event.preventDefault();
    coord = event.target;
    // what = {}

    $.post("/shoot", {coord: coord.id}, function(result) {
      console.log(result);
      if(result == "0") {
        $(coord).removeClass("empty").addClass("miss");
      }

      else {
        $(coord).removeClass("empty").addClass("hit");
      };

    })
  })
 
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
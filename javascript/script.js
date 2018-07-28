$(document).ready(function() {


var topics  = ["Limes", "Birds", "Water"]



function makeButton (){
  $("#buttonHold").empty()
  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>")
    a.addClass("gif")
    a.attr("value", topics[i])
    a.text(topics[i])
    $("#buttonHold").append(a)
  }

  $(document.body).on("click", ".giphy", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
}
makeButton();


  $(document.body).on("click" , ".gif", function(){
    var topics = $(this).attr("value");
    $("#carousel").empty()
    var carouselActive = $("<div>")
    var image = $("<img>")
    image.attr("src", "http://s2.thingpic.com/images/CH/xbrM759p7GvLiq5UUHJTw9sd.png")
    carouselActive.append(image)
    carouselActive.addClass("carousel-item active")
    $("#carousel").append(carouselActive)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      topics + "&api_key=IC2G7FVPJctOIXUe26c283jpHlUlZCbk";
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response){
        var results = response.data;
       for (var i = 0; i < results.length; i++) {
         if (results[i].rating !== "r" && results[i].rating !== "R") {
           var rating = results[i].rating;
           var p = $("<h4>").text("Rating: " + rating);
           var imageDiv = $("<div>")
           imageDiv.addClass("carousel-item")
           var image = $("<img>");
           image.attr("src", results[i].images.fixed_height.url);
           image.attr("data-state" , "animate")
           image.attr("date-still" ,results[i].images.fixed_height_still.url)
           image.attr("data-animate", results[i].images.fixed_height.url)
           image.addClass("giphy")
           imageDiv.append(p);
           imageDiv.append(image);
           $("#carousel").append(imageDiv);
      }}

  })


});

$("#addButton").on("click", function(){
var addTopic = $("#searchField").val().trim()
topics.push(addTopic)
$("#searchField").val("")
makeButton();


});












});

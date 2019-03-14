$(document).ready(function() {

var state = "";
var city = "";

$("#submitbutton").on("click", function(event) {
    event.preventDefault();
    city = $("#city-input").val().trim();
    state = $("#state-input").val().trim();
    console.log(city);
    console.log(state);
    $("#content-area").empty();
    movies();
    food();

})


// Function for calling movie API
function movies () {
var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=d9dbc09a5b4424d83367d7f502248bf6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";


$.ajax({
    url :queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
})
}


// Function for calling food API
function food () {
    var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+" + city + "+" + state + "&fields=photos&key=AIzaSyBLMlKcGTafBPYMN1Ybe9oe4JVWHYFLFIE";
    
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
    var number = (Math.floor(Math.random()*response.results.length));
    console.log(number);
    var queryURL2 = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + response.results[number].photos[0].photo_reference + "&key=AIzaSyBLMlKcGTafBPYMN1Ybe9oe4JVWHYFLFIE";


    var image = $("<img>");
    image.attr("src", queryURL2);
    $("#content-area").append(image);

})
}
var instance = M.Carousel.init({
    fullWidth: true
  });
})

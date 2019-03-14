$(document).ready(function() {


    $('.carousel.carousel-slider').carousel({
        fullWidth: true
      });
            

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
movies();

// Function for calling food API
function food () {
    var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+winterpark+FL&key=AIzaSyBLMlKcGTafBPYMN1Ybe9oe4JVWHYFLFIE";


$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
})
}
food();
})

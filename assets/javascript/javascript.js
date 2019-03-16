$(document).ready(function () {

    var state = "";
    var city = "";

    $("#submitbutton").on("click", function (event) {
        event.preventDefault();
        city = $("#city-input").val().trim();
        state = $("#state-input").val().trim();
        console.log(city);
        console.log(state);
        $("#userInputs").empty();
        movies();
        food();

    })


    // Function for calling movie API
    function movies() {
        var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=d9dbc09a5b4424d83367d7f502248bf6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var number = (Math.floor(Math.random() * response.results.length));
            var movie = response.results[number];
            var newDiv = $("<div>");
            newDiv.addClass("center-align");
            var heading = $("<h3>");
            var image = $("<img>");
            image.addClass("responsive-img");
            heading.text(movie.title);
            var poster = "https://image.tmdb.org/t/p/original" + movie.poster_path;
            image.attr("src", poster);
            image.attr("height", '50%');
            image.attr("width", '50%');
            console.log(movie.poster_path);
            newDiv.append(heading, image);
            $("#movie").append(newDiv);
            console.log(number);

        })
    }


    // Function for calling food API
    function food() {
        var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+" + city + "+" + state + "&fields=photos&key=AIzaSyBLMlKcGTafBPYMN1Ybe9oe4JVWHYFLFIE";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var number = (Math.floor(Math.random() * response.results.length));
            console.log("First Number: " + number);
            checkHours(number);
            function checkHours(x) {
                var isOpenNow = response.results[number].opening_hours.open_now;
                console.log(isOpenNow);
                if (isOpenNow === true) {
                    var foodPhoto = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + response.results[x].photos[0].photo_reference + "&key=AIzaSyBLMlKcGTafBPYMN1Ybe9oe4JVWHYFLFIE";
                    var newDiv = $("<div>");
                    newDiv.addClass("center-align");
                    var heading = $("<h3>");
                    var p = $("<h5>");
                    heading.text(response.results[x].name);
                    var pricing = response.results[x].price_level;
                    console.log(pricing);
                    var priceDisplay = "";
                    if (pricing === 1) {
                        priceDisplay = "$"
                    }
                    else if (pricing === 2) {
                        priceDisplay = "$$"
                    }
                    else if (pricing === 3) {
                        priceDisplay = "$$$"
                    }
                    else if (pricing === 4) {
                        priceDisplay = "$$$$"
                    }
                    else if (pricing === 5) {
                        priceDisplay = "$$$$$"
                    };
                    p.text("Price Level: " + priceDisplay);
                    var image = $("<img>");
                    image.addClass("responsive-img");
                    image.attr("src", foodPhoto);
                    newDiv.append(heading, p, image);
                    $("#food").append(newDiv);
                } else {
                    number = (Math.floor(Math.random() * response.results.length));
                    console.log("Next number:" + number);
                    checkHours(number);
                }

            }
        })
    }
})


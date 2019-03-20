$(document).ready(function () {
    // Global Variables
    var state = "";
    var city = "";
    // On click calls functions that calls the APIs
    $("#submitbutton").on("click", function (event) {
        event.preventDefault();
        city = $("#city-input").val().trim();
        state = $("#state-input").val().trim();
        $("#userInputs").empty();
        movies();
        food();
        retry();


    })
    // Onclick for the retry button
    $("#retry").on("click", "#retrybutton", function (event) {
        event.preventDefault();
        $("#movie").empty();
        $("#food").empty();
        movies();
        food();
    })

    $("#poster").on("click", "#moviePoster", function (event) {
        event.preventDefault();
        var status = $(this).attr("status");

        if (status === "min") {
            $(this).attr("status", "max");
            $("#clickInfo").text("(Click poster again to see less)");
            var p1 = $("<p>");
            var p2 = $("<p>");
            var p3 = $("<p>");
            var plot = $(this).attr("plot");
            var date = $(this).attr("releaseDate");
            var vote = $(this).attr("vote");
            p1.text(plot);
            p2.text("Release Date: " + date);
            p3.text("Rating: " + vote + "/10");
            $("#posterInfo").append(p1, p2, p3);
        } else {
            $(this).attr("status", "min");
            $("#clickInfo").text("(Click poster to see more info)");
            $("#posterInfo").empty();
        }
    })

    // Function for calling movie API
    function movies() {
        var queryURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + movieKey + "&language=en-US&region=US";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Apends movie poster and title to the page
            var number = (Math.floor(Math.random() * response.results.length));
            var movie = response.results[number];
            var newDiv = $("<div>");
            newDiv.addClass("center-align");
            var heading = $("<h3>");
            var image = $("<img>");
            var p = $("<p>");
            p.text("(Click poster to see more info)");
            p.attr("id", "clickInfo");
            image.attr("plot", response.results[number].overview);
            image.attr("releaseDate", response.results[number].release_date);
            image.attr("vote", response.results[number].vote_average);
            image.addClass("responsive-img");
            heading.text(movie.title);
            var poster = "https://image.tmdb.org/t/p/original" + movie.poster_path;
            image.attr("id", "moviePoster");
            image.attr("status", "min");
            image.attr("src", poster);
            image.attr("height", '50%');
            image.attr("width", '50%');
            newDiv.append(heading, p);
            $("#movie").append(newDiv);
            $("#poster").append(image);
        })
    }


    // Function for calling food API
    function food() {
        var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+" + city + "+" + state + "&fields=photos&key=" + googleKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Appends restaurant image, name, and price level to page
            var number = (Math.floor(Math.random() * response.results.length));
            var openCounter = 0;
            checkHours(number);
            // Checks to make sure restaurant is open, if not chooses another
            function checkHours(x) {
                openCounter++;
                var isOpenNow = response.results[number].opening_hours.open_now;
                if (isOpenNow === true) {
                    var foodPhoto = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + response.results[x].photos[0].photo_reference + "&key=" + googleKey;
                    var newDiv = $("<div>");
                    newDiv.addClass("center-align");
                    var heading = $("<h3>");
                    var p = $("<h5>");
                    heading.text(response.results[x].name);
                    var pricing = response.results[x].price_level;
                    var priceDisplay = "";
                    if (pricing === 1) {
                        priceDisplay = "$"
                        p.text("Price Level: " + priceDisplay);
                    }
                    else if (pricing === 2) {
                        priceDisplay = "$$"
                        p.text("Price Level: " + priceDisplay);
                    }
                    else if (pricing === 3) {
                        priceDisplay = "$$$"
                        p.text("Price Level: " + priceDisplay);
                    }
                    else if (pricing === 4) {
                        priceDisplay = "$$$$"
                        p.text("Price Level: " + priceDisplay);
                    }
                    else if (pricing === 5) {
                        priceDisplay = "$$$$$"
                        p.text("Price Level: " + priceDisplay);
                    };
                    var image = $("<img>");
                    image.addClass("responsive-img");
                    image.attr("src", foodPhoto);
                    newDiv.append(heading, p, image);
                    $("#food").append(newDiv);
                } else if (openCounter === 30) {
                    var newDiv = $("<div>");
                    var heading = $("<h3>");
                    heading.text("Unable to find an open restaurants at this time. Try again later.")
                    newDiv.append(heading);
                    $("#food").append(newDiv);
                } else {
                    number = (Math.floor(Math.random() * response.results.length));
                    checkHours(number);
                }

            }
        })
    }
    // Makes retry button to reselect the movie and restaurant
    function retry() {
        var button = $("<button>");
        button.text("Retry");
        button.addClass("btn waves-effect waves-light");
        button.attr("id", "retrybutton");
        $("#retry").append(button);
    }
})


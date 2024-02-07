// Movie data
var movies = [
    { title: "TENET", imdbRating: "9.8", posterURL: "small_logo.png" },
    { title: "WW 84", imdbRating: "8.5", posterURL: "images/hollywood/12.jpg" },
    { title: "MONOCHROME", imdbRating: "9.2", posterURL: "images/hollywood/13.jpg" },
    { title: "MORTAL", imdbRating: "8.5", posterURL: "images/hollywood/14.jpg" },
    { title: "DONT LOOK BACK", imdbRating: "8.9", posterURL: "images/hollywood/15.jpg" },
    // { title: "BLOOD HOUND", imdbRating: "8.5", posterURL: "images/hollywood/3.jpg" },
    // { title: "REUNION", imdbRating: "9.5", posterURL: "images/hollywood/1.jpg" }
];

// Get the Hollywood container
var iollywoodContainer = document.getElementById("iollywoodContainer");

// Dynamically create and append movie items with buttons
movies.forEach(function (movie) {
    var movieDiv = document.createElement("div");
    movieDiv.className = "iollywood-inside";

    var img = document.createElement("img");
    img.src = movie.posterURL;
    img.alt = movie.title;

    var h3 = document.createElement("h3");
    h3.innerText = movie.title;

    var imdbDiv = document.createElement("div");
    imdbDiv.className = "imdb";
    imdbDiv.innerHTML = "<p>" + movie.imdbRating + "</p>";

    // Create a button for each movie
    var button = document.createElement("button");
    button.textContent = "View Details";
    button.onclick = function () {
        navigateTo('index_movies2.html?id=' + movie.title);
    };

    movieDiv.appendChild(img);
    movieDiv.appendChild(h3);
    movieDiv.appendChild(imdbDiv);
    movieDiv.appendChild(button);

    iollywoodContainer.appendChild(movieDiv);
});

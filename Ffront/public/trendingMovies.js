// Movie data
var movies = [
    { title: "TENET", imdbRating: "9.8", posterURL: "images/hollywood/2.jpg" },
    { title: "WW 84", imdbRating: "8.5", posterURL: "images/hollywood/12.jpg" },
    { title: "MONOCHROME", imdbRating: "9.2", posterURL: "images/hollywood/13.jpg" },
    { title: "MORTAL", imdbRating: "8.5", posterURL: "images/hollywood/14.jpg" },
    { title: "DONT LOOK BACK", imdbRating: "8.9", posterURL: "images/hollywood/15.jpg" },
    { title: "BLOOD HOUND", imdbRating: "8.5", posterURL: "images/hollywood/3.jpg" },
    { title: "REUNION", imdbRating: "9.5", posterURL: "images/hollywood/1.jpg" }
];

// Get the Hollywood container
var hollywoodContainer = document.getElementById("hollywoodContainer");

// Dynamically create and append movie items
movies.forEach(function (movie) {
    var movieDiv = document.createElement("div");
    movieDiv.className = "hollywood-inside";

    var img = document.createElement("img");
    img.src = movie.posterURL;
    img.alt = movie.title;

    var h3 = document.createElement("h3");
    h3.innerText = movie.title;

    var imdbDiv = document.createElement("div");
    imdbDiv.className = "imdb";
    imdbDiv.innerHTML = "<p>" + movie.imdbRating + "</p>";

    movieDiv.appendChild(img);
    movieDiv.appendChild(h3);
    movieDiv.appendChild(imdbDiv);

    hollywoodContainer.appendChild(movieDiv);
});

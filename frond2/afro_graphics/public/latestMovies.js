// Array of latest movies
var latestMovies = [
    {
        primaryTitle: "Dama de noche",
        genre: "Drama,Mystery,Romance",
        posterURL: "https://image.tmdb.org/t/p/w92/zCmyAl7VG6aZJqWZ7PFfj9e6ToU.jpg",
    },
    {
        primaryTitle: "Hen Hop",
        genre: "Animation,Short",
        posterURL: "https://image.tmdb.org/t/p/w92/88EH2TVg6fGK7SnGXcfQ05MD2Rk.jpg",
    },
    {
        primaryTitle: "Afro",
        genre: "Animation,Short",
        posterURL: "small_logo.png",
    },
    {
        primaryTitle: "Afro",
        genre: "Animation,Short",
        posterURL: "small_logo.png",
    },
    {
        primaryTitle: "Afro",
        genre: "Animation,Short",
        posterURL: "small_logo.png",
    },
];

// Iterate through the latestMovies array
for (var i = 0; i < latestMovies.length; i++) {
    var latestMovie = latestMovies[i];

    // Create movie elements
    var latestContainer = document.getElementById("latestContainer");
    var latestDiv = document.createElement("div");
    latestDiv.classList.add("latest-inside");

    // Set the values in the HTML elements for each latest movie
    latestDiv.innerHTML = `
      <img class="posterImage" src="${latestMovie.posterURL}" alt=" ">
      <!--there goes the actor's photo-->
      <div class="heading1">
          <h4 class="movieTitle">${latestMovie.primaryTitle}</h4>
          <!--there goes the actor's name-->
      </div>
    `;

    // Append the movie elements to the latest container
    latestContainer.appendChild(latestDiv);
}

 // Array of slatest movies
var slatestMovies = [
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

// Iterate through the slatestMovies array
for (var i = 0; i < slatestMovies.length; i++) {
    var slatestMovie = slatestMovies[i];

    // Create movie elements
    var slatestContainer = document.getElementById("slatestContainer");
    var slatestDiv = document.createElement("div");
    slatestDiv.classList.add("slatest-inside");

    // Set the values in the HTML elements for each slatest movie
    slatestDiv.innerHTML = `
      <img class="posterImage" src="${slatestMovie.posterURL}" alt=" ">
      <!--there goes the actor's photo-->
      <div class="heading1">
          <h4 class="movieTitle">${slatestMovie.primaryTitle}</h4>
          <!--there goes the actor's name-->
      </div>
    `;

    // Append the movie elements to the slatest container
    slatestContainer.appendChild(slatestDiv);
}

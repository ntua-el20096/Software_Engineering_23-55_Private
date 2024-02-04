// Array of latest movies
var latestMovies = [
    {
        primaryTitle: "Dama de noche",
        genre: "Drama,Mystery,Romance",
        posterURL: "https://image.tmdb.org/t/p/w92/zCmyAl7VG6aZJqWZ7PFfj9e6ToU.jpg",
        watchNowUrl: "https://example.com/watch-now-1",
    },
    {
        primaryTitle: "Hen Hop",
        genre: "Animation,Short",
        posterURL: "https://image.tmdb.org/t/p/w92/88EH2TVg6fGK7SnGXcfQ05MD2Rk.jpg",
        watchNowUrl: "https://example.com/watch-now-2",
    },
    // Add more movies as needed
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
      <img class="posterImage" src="${latestMovie.posterURL}" alt="${latestMovie.primaryTitle} Poster">
      <div class="heading1">
          <h4 class="movieTitle">${latestMovie.primaryTitle}</h4>
          <p><span>&#9733;&#9733;&#9733;&#9733;&#9734; </span></p>
          <h6 class="movieGenre">${latestMovie.genre}</h6>
      </div>
      <div class="btn2" id="watchNowContainer${i}">
          <!-- Watch Now button will be added dynamically here -->
      </div>
    `;

    // Append the movie elements to the latest container
    latestContainer.appendChild(latestDiv);

    // Create and append the Watch Now button
    var watchNowContainer = document.getElementById(`watchNowContainer${i}`);
    var watchNowBtn = document.createElement("a");
    
    // Dynamically set the href based on primaryTitle
    watchNowBtn.href = `https://localhost:8765/energy/api/searchtitle?titlePart=${encodeURIComponent(latestMovie.primaryTitle)}`;
    
    watchNowBtn.innerText = "See More";
    watchNowContainer.appendChild(watchNowBtn);
}

function scrollRight() {
    const container = document.querySelector('.slatest-movies');
    container.scrollBy({
        top: 0,
        left: 150, // Adjust the scroll distance
        behavior: 'smooth' // Add smooth scrolling effect
    });
}
 
// Retrieve actor's details array from sessionStorage
var actorDetailsArray = JSON.parse(sessionStorage.getItem('actorDetailsArray')) || [];

// Array of slatest movies
var slatestMovies = [
    
         
    ];

// Iterate through the actorDetailsArray and create entries for slatestMovies
actorDetailsArray.forEach(actorDetails => {
    // Create an entry for slatestMovies
    var slatestMovieForActor = {
        nameID: actorDetails.nameID,
        name: actorDetails.name,
        category: actorDetails.category,
        posterURL: "https://image.tmdb.org/t/p/w92/" + actorDetails.posterURL
    };

    // Append the new entry to slatestMovies
    slatestMovies.push(slatestMovieForActor);
});

// Iterate through the slatestMovies array
function redirectToActorDetails(nameID) {
    window.location.href = `index_actor_details.html?nameID=${nameID}`;
}

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
        <!-- there goes the actor's photo -->
        <div class="heading1">
            <h4 class="movieTitle">${slatestMovie.name}</h4>
            <p class="movieCategory">${slatestMovie.category}</p>
            <!-- there goes the actor's name -->
        </div>
    `;

    // Add an event listener to each slatest movie element
    slatestDiv.addEventListener("click", (function (nameID) {
        return function () {
            // Redirect to index_actor_details.html with the corresponding nameID
            redirectToActorDetails(nameID);
        }
    })(slatestMovie.nameID));

    // Append the movie elements to the slatest container
    slatestContainer.appendChild(slatestDiv);
}
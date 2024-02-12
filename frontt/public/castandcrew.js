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
var slatestMovies = [];
 
// Iterate through the actorDetailsArray and create entries for slatestMovies
actorDetailsArray.forEach(async actorDetails => {
    // Create an entry for slatestMovies
    try {
        // Fetch additional details including category from the API
        const additionalDetails = await fetchActorDetails(actorDetails.nameID);

        // Create an entry for slatestMovies
        var slatestMovieForActor = {
            nameID: actorDetails.nameID,
            name: actorDetails.name,
            category: actorDetails.category || 'N/A',// Use the category fetched from the API
            posterURL: additionalDetails.posterURL
        };

        // Append the new entry to slatestMovies
        slatestMovies.push(slatestMovieForActor);
    } catch (error) {
        console.error('Error fetching actor details:', error);
        // Handle error if needed
    }
});

// Iterate through the slatestMovies array
function redirectToActorDetails(nameID) {
    window.location.href = `index_actor_details.html?nameID=${nameID}`;
}

function fetchActorDetails(nameID) {
    return fetch(`https://localhost:8765/energy/api/name/${nameID}`)
        .then(response => response.json())
        .then(data => {
            const actorDetails = data.nameObject;

            // Use the principal_imageURL for the actor's poster
            const posterURL = actorDetails.namePoster.replace('{width_variable}', 'w500') || 'default_poster.jpg';

            return {
                 nameID: actorDetails.nameID,
                 name: actorDetails.name,
               // category: actorDetails.category || 'N/A',
                posterURL: posterURL
            };
        })
        .catch(error => {
            console.error('Error fetching actor details:', error);
            return {
                nameID: nameID,
                name: `Name ID: ${nameID}`,
               // category: 'N/A',
                posterURL: 'default_poster.jpg'
            };
        });
}
 
// Fetch posters for each actor
var postersPromises = slatestMovies.map(actor => fetchActorDetails(actor.nameID));

Promise.all(actorDetailsArray.map(async actorDetails => {
    try {
        // Fetch additional details including category from the API
        const additionalDetails = await fetchActorDetails(actorDetails.nameID);

        // Create an entry for slatestMovies
        var slatestMovieForActor = {
            nameID: actorDetails.nameID,
            name: actorDetails.name,
            category: actorDetails.category || 'N/A', // Use the category fetched from the API
            posterURL: additionalDetails.posterURL
        };

        // Append the new entry to slatestMovies
        return slatestMovieForActor;
    } catch (error) {
        console.error('Error fetching actor details:', error);
        // Handle error if needed
        return null;
    }
}))
.then(updatedSlates => {
    // Filter out null values (entries with errors) from the updatedSlates array
    slatestMovies = updatedSlates.filter(movie => movie !== null);

    // After fetching posters, update the UI
    updateUI();
})
.catch(error => console.error('Error fetching actor details:', error));


// ... (your existing code)

function updateUI() {
    // Get the container where you want to display the slatest movies
    var slatestContainer = document.getElementById("slatestContainer");

    // Clear the container before adding the updated movie elements
    slatestContainer.innerHTML = '';

    // Iterate through the slatestMovies array
    for (var i = 0; i < slatestMovies.length; i++) {
        var slatestMovie = slatestMovies[i];

        // Check if the posterURL is \\N, replace it with default image
        var posterURL = slatestMovie.posterURL === '\\N' ? 'big_logo.png' : slatestMovie.posterURL;

        // Log the posterURL to check if it's correct
        console.log('Poster URL:', posterURL);

        // Create movie elements
        var slatestDiv = document.createElement("div");
        slatestDiv.classList.add("slatest-inside");

        // Set the values in the HTML elements for each slatest movie
        slatestDiv.innerHTML = `
            <img class="posterImage" src="${posterURL}" alt=" ">
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
}

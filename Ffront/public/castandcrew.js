// function scrollRight() {
//     const container = document.querySelector('.slatest-movies');
//     container.scrollBy({
//         top: 0,
//         left: 150, // Adjust the scroll distance
//         behavior: 'smooth' // Add smooth scrolling effect
//     });
// }
// function scrollLeft() {
//     const container = document.querySelector('.slatest-movies');
//     container.scrollBy({
//         top: 0,
//         left: -150, // Adjust the scroll distance
//         behavior: 'smooth' // Add smooth scrolling effect
//     });
// }

//const baseurl = 'https://localhost:8765/energy/api';


function scrollRight() {
    const container = document.querySelector('.slatest-movies');
    container.scrollLeft += 150; // Adjust the scroll distance
}

function scrollLeft() {
    const container = document.querySelector('.slatest-movies');
    container.scrollLeft -= 150; // Adjust the scroll distance
}

document.addEventListener('MovieDataLoaded', function () {
    // Begin of the event listener's function block

    // Retrieve actor's details array from sessionStorage
    var actorDetailsArray = JSON.parse(sessionStorage.getItem('actorDetailsArray')) || [];

    // Logic to process actorDetailsArray and update the UI
    // This might include fetching additional details for each actor,
    // then updating the UI with these details.

    Promise.all(actorDetailsArray.map(actor => fetchActorDetails(actor.nameID)))
        .then(details => {
            // Filter out any null values in case some fetches failed
            slatestMovies = details.filter(detail => detail !== null);

            // Now, update the UI
            updateUI();
        })
        .catch(error => console.error('Error in fetching all actor details:', error));

    // End of the event listener's function block
}); // H
// Retrieve actor's details array from sessionStorage
  
 
// Iterate through the actorDetailsArray and create entries for slatestMovies
 


// Iterate through the slatestMovies array
function redirectToActorDetails(nameID) {
    window.location.href = `index_actor_details.html?nameID=${nameID}`;
}

function fetchActorDetails(nameID) {
    return fetch(`${baseurl}/name/${nameID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Process and return the relevant actor details here
            return {
                // Assuming your API returns these details
                nameID: data.nameObject.nameID,
                name: data.nameObject.name,
                posterURL: data.nameObject.namePoster.replace('{width_variable}', 'w500') || 'default_poster.jpg',
            };
        })
        .catch(error => {
            console.error('Error fetching actor details:', error);
            return null; // Return null or some default object structure
        });
}

// Use Promise.all to wait for all actor details to be fetched
Promise.all(actorDetailsArray.map(actor => fetchActorDetails(actor.nameID)))
    .then(details => {
        // Filter out any null values in case some fetches failed
        slatestMovies = details.filter(detail => detail !== null);

        // Now, update the UI
        updateUI();
    })
    .catch(error => console.error('Error in fetching all actor details:', error));
function updateUI() {
    // Get the container where you want to display the slatest movies
    var slatestContainer = document.getElementById("slatestContainer");

    // Clear the container before adding the updated movie elements
    slatestContainer.innerHTML = '';

    // Iterate through the slatestMovies array
    for (var i = 0; i < slatestMovies.length; i++) {
        var slatestMovie = slatestMovies[i];

        // Check if the posterURL is \\N, replace it with default image
        var posterURL = slatestMovie.posterURL === '\\N' ? 'none.png' : slatestMovie.posterURL;

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

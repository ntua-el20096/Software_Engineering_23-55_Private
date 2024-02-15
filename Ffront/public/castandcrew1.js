window.addEventListener('load', function () {
    console.log('Cast and Crew script loaded and window loaded event triggered.');

    const actorDetailsArray = JSON.parse(sessionStorage.getItem('actorDetailsArray')) || [];

    // Fetch details for each actor
    const fetchPromises = actorDetailsArray.map(actor => {
        const { nameID, category } = actor;
        console.log('Name:', nameID);
        return fetch(`${baseurl}/name/${nameID}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Check if data and required fields are valid
                if (!data || !data.nameObject || !data.nameObject.name || !data.nameObject.namePoster) {
                    console.error(`Invalid data received for nameID ${nameID}:`, data);
                    return null;
                }

                const { nameObject } = data;
                const { name, namePoster } = nameObject;

                // Logging for debugging
                console.log('Original Poster URL:', namePoster);
                console.log('Name:', name);

                // Replace '{width_variable}' with 'w500', or use 'default_poster.jpg' as fallback
                const adjustedPosterURL = namePoster.includes('{width_variable}') ? namePoster.replace('{width_variable}', 'w500') : 'default_poster.jpg';

                // Check if the adjusted poster URL is '\\N', replace it with 'none.png'
                const finalPosterURL = adjustedPosterURL === 'default_poster.jpg' ? 'none.png' : adjustedPosterURL;

                // Logging for debugging
                console.log('Adjusted Poster URL:', finalPosterURL);

                // Generate HTML content for each actor
                const slatestDiv = document.createElement('div');
                slatestDiv.innerHTML = `
                    <img class="posterImage" src="${finalPosterURL}" alt=" ">
                    <div class="heading1">
                        <h4 class="movieTitle">${name}</h4>
                        <p class="movieCategory">${category}</p>
                    </div>`;

                return slatestDiv;
            })
            .catch(error => {
                console.error(`Error fetching actor details for nameID ${nameID}:`, error);
                return null; // Return null for unsuccessful fetch
            });
    });

    // Wait for all fetch requests to complete
    Promise.all(fetchPromises)
        .then(slatestDivs => {
            // Append the generated HTML content to the container
            const slatestContainer = document.getElementById('slatestContainer');
            slatestDivs.forEach(div => {
                if (div) { // Check for null (unsuccessful fetch)
                    slatestContainer.appendChild(div);
                }
            });
        })
        .catch(error => console.error('Error during fetch requests:', error));
});

async function searchMovies() {
    const searchInput = document.getElementById('searchInput').value;

    if (!searchInput) {
        alert('Please enter a movie title.');
        return;
    }

    try {
        console.log('Search Input:', searchInput); // Log search input value

        const cleanedSearchInput = encodeURIComponent(searchInput);

        const [titleResponse, nameResponse] = await Promise.all([
            fetch(`/energy/api/searchtitle?titlePart=${cleanedSearchInput}`),
            fetch(`/energy/api/searchname?namePart=${cleanedSearchInput}`)
        ]);

        const titleData = await titleResponse.json();
        const nameData = await nameResponse.json();

        console.log('Title Data:', titleData); // Log title data
        console.log('Name Data:', nameData);   // Log name data

        // Store data in localStorage
        localStorage.setItem('titleData', JSON.stringify(titleData));
        localStorage.setItem('nameData', JSON.stringify(nameData));

        // Redirect to results.html
        window.location.replace('/results.html');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function displayResults(titleData, nameData) {
    const leftColumn = document.getElementById('leftColumn');
    const rightColumn = document.getElementById('rightColumn');

    leftColumn.innerHTML = '';
    rightColumn.innerHTML = '';
    
    if (!titleData.data.length && !nameData.length) {
        leftColumn.textContent = 'No matching movies or names found.';
    }

    if (titleData.status === 'success' && titleData.data.length > 0) {
        const titleList = document.createElement('ul');

        titleData.data.forEach(movie => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${movie.type}</strong> - <br>
                ${movie.originalTitle} - <br>
                ${movie.startYear ? 'Start Year: ' + movie.startYear : ''} - 
                ${movie.endYear ? 'End Year: ' + movie.endYear : 'Present'} - <br>
                ${movie.runtimeMinutes ? 'Runtime: ' + movie.runtimeMinutes + ' mins' : ''} - <br>
                <em>Poster:</em> <img src="${getPosterUrl(movie.titlePoster, `w92`)}" alt="Movie Poster" style="max-height: 100px;"> - <br>
                <em>Average Rating:</em> ${movie.avRating !== undefined ? 'Rating: ' + movie.avRating.toFixed(1) : 'Rating: Not available'} - <br>
                <em>Number of Votes:</em> ${movie.nVotes !== undefined ? 'Votes: ' + movie.nVotes : 'Votes: Not available'} <br><br>
            `;
            titleList.appendChild(listItem);
        });

        leftColumn.appendChild(titleList);
    } else {
        leftColumn.textContent = 'No matching movies found.';
    }

    if (nameData.length > 0) {
        const nameList = document.createElement('ul');

        nameData.forEach(name => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${name.nameID}</strong> - <br>
                Birth Year: ${name.birthYr || 'N/A'} - <br>
                Death Year: ${name.deathYr || 'Present'} - <br>
                Profession: ${name.profession || 'N/A'} - <br>
                <em>Poster:</em> <img src="${getPosterUrl(name.namePoster, `w92`)}" alt="Name Poster" style="max-height: 100px;"> <br><br>
            `;
            nameList.appendChild(listItem);
        });

        rightColumn.appendChild(nameList);
    } else {
        if (titleData.status !== 'success' || titleData.data.length === 0) {
            rightColumn.textContent = 'No matching names found.';
        }
    }
}
        function getPosterUrl(url, width) {
            if (url) {
                return url.replace('{width_variable}', width);
            }
            return '';
        }
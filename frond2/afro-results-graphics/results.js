
    // Function to parse query parameters from the URL
    function goToTitleDetails(movie) {
        const queryString = `?title=${encodeURIComponent(movie.title_primaryTitle)}&category=${encodeURIComponent(movie.title_type)}&releaseYear=${encodeURIComponent(movie.title_startYear)}&rating=${encodeURIComponent(movie.avRating)}&votes=${encodeURIComponent(movie.nVotes)}`;
        window.location.href = `index_movie_details.html${queryString}`;
    }
    
    function goToNameDetails(name) {
        const queryString = `?name=${encodeURIComponent(name.name)}&birthYear=${encodeURIComponent(name.birthYr || 'N/A')}&deathYear=${encodeURIComponent(name.deathYr || 'Present')}&profession=${encodeURIComponent(name.profession || 'N/A')}&posterUrl=${encodeURIComponent(getPosterUrl(name.namePoster, 'w185'))}`;
        window.location.href = `index_actor_details.html${queryString}`;
    }
    
            function getQueryParams() {
                const queryParams = {};
                const queryString = window.location.search.substring(1);
                const params = queryString.split('&');
    
                for (const param of params) {
                    const [key, value] = param.split('=');
                    queryParams[key] = decodeURIComponent(value);
                }
    
                return queryParams;
            }
    
            // Function to display search results
            function displayResults() {
        const queryParams = getQueryParams();
        const titleData = JSON.parse(localStorage.getItem('titleData') || 'null');
        const nameData = JSON.parse(localStorage.getItem('nameData') || 'null');
        const titleContainer = document.getElementById('titleContainer');
        const nameContainer = document.getElementById('nameContainer');
    
        if (titleData) {
            titleContainer.innerHTML = '';
    
            if (titleData.status === 'success' && titleData.data.length > 0) {
                titleData.data.forEach(movie => {
                    const content = `
                        <img src="${getPosterUrl(movie.title_posterURL, 'w185')}" alt="Poster Image" onerror="this.src='big_logo.png'" style="max-height: 250px;"> <br>
                        <strong>${movie.title_primaryTitle}</strong> <br>
                    `;
                    appendResult(titleContainer, content, () => goToTitleDetails(movie));
                });
            } else {
                titleContainer.innerHTML = 'No matching movies found.';
            }
        }
    
        if (nameData) {
            nameContainer.innerHTML = '';
    
            if (nameData.length > 0) {
                nameData.forEach(name => {
                    const content = `
                    <img src="${getPosterUrl(name.namePoster, 'w185')}" alt="Poster Image" onerror="this.src='big_logo.png'" style="max-height: 250px;"><br><br>
                    <strong>${name.name}</strong> <br>
                    `;
                    appendResult(nameContainer, content, () => goToNameDetails(name));
                });
            } else {
                if (!titleData || (titleData.status !== 'success' || titleData.data.length === 0)) {
                    nameContainer.innerHTML = 'No matching names found.';
                }
            }
        }
    }
            function createResultBox(content, clickHandler) {
            const resultBox = document.createElement('div');
            resultBox.className = 'resultBox';
            resultBox.innerHTML = content;
            resultBox.addEventListener('click', clickHandler);
            return resultBox;
        }
    
        function appendResult(container, content, clickHandler) {
            const resultBox = createResultBox(content, clickHandler);
            container.appendChild(resultBox);
        }
    
        // Function to display search results
        
        function getPosterUrl(url, width) {
            if (url) {
                return url.replace('{width_variable}', width);
            }
            return '';
        }
    
        // Call displayResults function when the page loads
        window.onload = displayResults;

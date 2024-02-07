document.addEventListener('DOMContentLoaded', function () {
    const queryParams = getQueryParams();
    const title = queryParams['title'] || '';
    const category = queryParams['category'] || '';
    const releaseYear = queryParams['releaseYear'] || '';
    const rating = queryParams['rating'] || '';
    const votes = queryParams['votes'] || '';
    const isAdult = queryParams['isAdult'] || ''; // Add this line
const runtimeMinutes = queryParams['runtimeMinutes'] || ''; // Add this line

    document.getElementById('movieTitle').textContent = title;
    document.getElementById('movieCategory').textContent = `Category: ${category}`;
    document.getElementById('movieReleaseYear').textContent = `Release Year: ${releaseYear}`;
    document.getElementById('movieRating').textContent = `Rating: ${rating}`;
    document.getElementById('movieVotes').textContent = `Votes: ${votes}`;

    const posterUrl = queryParams['posterUrl'] || ''; // Add this line
document.getElementById('posterImg').src = posterUrl; // Set the poster image source

const detailsContainer = document.querySelector('.inside-heropage');
detailsContainer.innerHTML += `
<p>For ${isAdult ? 'Adults' : 'All Ages'}</p>
<p>${runtimeMinutes ? 'Runtime: ' + runtimeMinutes + ' mins' : ''}</p>
`;
});

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

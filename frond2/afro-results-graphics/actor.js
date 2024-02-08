// Function to parse query parameters from the URL
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

// Function to retrieve a specific query parameter
function getQueryParam(param) {
    const queryParams = getQueryParams();
    return queryParams[param] || 'N/A';
}

 

document.addEventListener('DOMContentLoaded', function () {
    const name = getQueryParam('name');
    const birthYear = getQueryParam('birthYear');
    const deathYear = getQueryParam('deathYear');
    const profession = getQueryParam('profession');
    const posterUrl = getQueryParam('posterUrl');

    document.getElementById('actorName').textContent = name;
    document.getElementById('birthYear').textContent = `Birth Year: ${birthYear}`;
    document.getElementById('deathYear').textContent = `Death Year: ${deathYear}`;
    document.getElementById('profession').textContent = `Profession: ${profession}`;
    document.getElementById('posterImg').src = posterUrl;
});

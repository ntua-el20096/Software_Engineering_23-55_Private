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

function getQueryParam(param) {
    const queryParams = getQueryParams();
    return queryParams[param] || 'N/A';
}

document.addEventListener('DOMContentLoaded', function () {
const nameID = getQueryParam('nameID');
// Fetch actor details using an API endpoint
fetch(`https://localhost:8765/energy/api/name/${nameID}`)
.then(response => response.json())
.then(data => {
    const actorDetails = data.nameObject;
    document.getElementById('actorName').textContent = actorDetails.name;
    document.getElementById('birthYear').textContent = `Birth Year: ${actorDetails.birthYr}`;
    document.getElementById('deathYear').textContent = `Death Year: ${actorDetails.deathYr}`;
    document.getElementById('profession').textContent = `Profession: ${actorDetails.profession}`;
    
    // Replace {width_variable} with 'w500' or your desired width
    const posterUrl = actorDetails.namePoster.replace('{width_variable}', 'w500') || 'default_poster.jpg';
    document.getElementById('posterImg').src = posterUrl;
})
.catch(error => console.error('Error fetching actor details:', error));
});
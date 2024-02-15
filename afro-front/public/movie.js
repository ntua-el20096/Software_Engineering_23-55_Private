const baseurl = 'https://localhost:8765/energy/api';

document.addEventListener('DOMContentLoaded', function () {
  console.log('Script loaded and DOMContentLoaded event triggered.');

  const queryParams = getQueryParams();
  console.log('Query Parameters:', queryParams);

  const titleID = queryParams['titleID'] || '';
  console.log('Fetching movie details for titleID:', titleID);

  // Fetch movie details from the API
  fetch(`${baseurl}/title/${titleID}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const titleObject = data.titleObject;
      if (titleObject.principals.length > 0) {
        sessionStorage.setItem('actorDetailsArray', JSON.stringify(titleObject.principals));
      }
      document.querySelector('.heropage h1').textContent = titleObject.originalTitle;

      // Check if type is '/N' and set text content accordingly
      const categoryText = titleObject.type === '\\N' ? 'Not categorized' : titleObject.type;
      document.getElementById('movieCategory').textContent = `Category: ${categoryText}`;

      document.getElementById('movieReleaseYear').textContent = `This work has been released: ${titleObject.startYear}`;
      document.getElementById('movieRating').textContent = ` ${titleObject.avRating}`;
      document.getElementById('movieVotes').textContent = ` # of Votes: ${titleObject.nVotes}`;

      // Display genres
      // Display genres
const genres = titleObject.genres.map(genre => genre.genreTitle).join(', ');

if (genres === '\\N') { // Check if genres is '\N'
  document.getElementById('movieGenres').textContent = "Not categorized";
} else {
  document.getElementById('movieGenres').textContent = `It falls into the category of ${genres}`;
}


      const posterUrl = titleObject.titlePoster === '\\N' ? 'big_logo.png' : titleObject.titlePoster.replace('{width_variable}', 'w500') || '';
      console.log('Poster URL:', posterUrl);
      document.getElementById('posterImg').src = posterUrl;
      document.dispatchEvent(new CustomEvent('MovieDataLoaded'));
    })
    .catch(error => console.error('Error fetching movie details:', error));
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
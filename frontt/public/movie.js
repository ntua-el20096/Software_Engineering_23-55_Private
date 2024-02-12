document.addEventListener('DOMContentLoaded', function () {
  console.log('Script loaded and DOMContentLoaded event triggered.' );

  const queryParams = getQueryParams();
  console.log('Query Parameters:', queryParams);

  const titleID = queryParams['titleID'] || '';
  console.log('Fetching movie details for titleID:', titleID);

  // Fetch movie details from the API
  fetch(`https://localhost:8765/energy/api/title/${titleID}`)
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
      // Update HTML elements with movie details
      //document.getElementById('heroMovieTitle').textContent = titleObject.originalTitle;
      document.querySelector('.heropage h1').textContent = titleObject.originalTitle;

      //document.getElementById('movieTitle').textContent = titleObject.originalTitle;
      document.getElementById('movieCategory').textContent = `Category: ${titleObject.type}`;
      document.getElementById('movieReleaseYear').textContent = `Release Year: ${titleObject.startYear}`;
      document.getElementById('movieRating').textContent = `Rating: ${titleObject.avRating}`;
      document.getElementById('movieVotes').textContent = `Votes: ${titleObject.nVotes}`;

      // Display genres
      const genres = titleObject.genres.map(genre => genre.genreTitle).join(', ');
      document.getElementById('movieGenres').textContent = `Genres: ${genres}`;

      // Display titleAkas
      const titleAkas = titleObject.titleAkas.map(aka => aka.akaTitle).join(', ');
      document.getElementById('movieTitleAkas').textContent = `AKA Titles: ${titleAkas}`;
      const posterUrl = titleObject.titlePoster.replace('{width_variable}', 'w500') || '';
      console.log('Poster URL:', posterUrl); // Log the poster URL
      document.getElementById('posterImg').src = posterUrl;
      // Display principals
      const principalsContainer = document.getElementById('moviePrincipals');
      titleObject.principals.forEach(principal => {
        const principalElement = document.createElement('div');
        principalElement.textContent = `${principal.category}: ${principal.name}`;
        principalsContainer.appendChild(principalElement);
      });
       
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















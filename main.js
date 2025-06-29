const form = document.querySelector('form');
const container = document.querySelector('.image-container');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let query = form.querySelector('input').value;
  console.log(query);

  tvMazeApi(query);
});

async function tvMazeApi(query) {
  const req = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
  const res = await req.json();
  // console.log(res);

  makeImages(res); // pass the correct variable
}

function makeImages(movies) {
  container.innerHTML = ''; //clear previous images
  for (let movie of movies) {
    if (movie.show.image) { // check if image exists
      let src = movie.show.image.medium;
      const img = document.createElement('img');
      img.src = src;
      container.appendChild(img);
    }
  }
}

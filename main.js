const form = document.querySelector("form");
const container = document.querySelector(".image-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = document.querySelector(".search-input").value.trim();

  if (query === "") {
    alert("Please enter movie name");
    return;
  }

  fetchMovies(query);
});

async function fetchMovies(query) {
  try {
    const req = await fetch(
      `https://api.tvmaze.com/search/shows?q=${query}`
    );

    const res = await req.json();

    showMovies(res);
  } catch (error) {
    console.log("Error:", error);
  }
}

function showMovies(movies) {
  container.innerHTML = "";

  let found = false;

  for (let movie of movies) {
    if (movie.show && movie.show.image) {
      const img = document.createElement("img");
      img.src = movie.show.image.medium;

      container.appendChild(img);
      found = true;
    }
  }

  if (!found) {
    container.innerHTML = "<p>No results found</p>";
  }
}

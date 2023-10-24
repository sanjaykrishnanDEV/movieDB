const searchBtn = document.getElementById("search");
const input = document.getElementById("input");
const popup_container = document.querySelector(".popup-container");
const apikey = "api_key=8ea68237379782a56cf3b4b12d40f1d9";
const baseurl = "https://api.themoviedb.org/3";
const api_url = baseurl + "/discover/movie?sort_by=popularity.desc&" + apikey;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWE2ODIzNzM3OTc4MmE1NmNmM2I0YjEyZDQwZjFkOSIsInN1YiI6IjY1MzcyNzRjYzUwYWQyMDBlYjJkYWFhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Fjb3Htzd2i7hpHrxvhnCZPRLUrrB6rFwsjeZtY7RQ0",
  },
};
const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  localStorage.clear();
  alert("Are you sure?");
  window.location.href = "../index.html";
});

//trending movies
fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", options)
  .then((response) => response.json())
  .then((response) => {
    // console.log(response.results)
    const trending = document.querySelectorAll(".trending");
    trending.forEach((element, index) => {
      element.innerHTML = `
    <img class="mt-3" src="https://image.tmdb.org/t/p/w200/${
      response.results[index].poster_path
    }"/>
    <h2 class="text-center">${response.results[index].original_title}</h2>
    <h6 class="text-center">${Math.floor(
      response.results[index].vote_average
    )}/10</h6>
    `;
    });
  })
  .catch((err) => console.error(err));
//trending movies
function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
      console.log(data.results);
    });
}

getMovies(api_url);
const arrayOfMovies = [];
function showMovies(data) {
  data.forEach((movie, index) => {
    const main = document.getElementById("main");
    const { title, poster_path, vote_average, overview, id } = data[index];
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <a>
    <div class="moviecard text-light d-flex flex-column align-items-center">
    <img src="https://image.tmdb.org/t/p/w200/${poster_path}" alt="title" />
    <div class="movie-info">
          <h5 class="text-center">${title}</h5>
          <h6>${vote_average}/10</h6>
        </div>
      </div>
      </a> 
      `;
    const movie_cards = document.getElementsByClassName("movie");
    // const array = Array.from(...movie_cards);

    for (let i = 0; i < movie_cards.length; i++) {
      arrayOfMovies.push(movie_cards[i]);
    }
    movieEl.setAttribute("id", id);
    main.appendChild(movieEl);
  });
  //   arrayOfMovies.forEach((el,index)=>{
  //     el.addEventListener("click",()=>{alert("L")})
  //   })
  console.log(arrayOfMovies.length);
}

searchBtn.addEventListener("click", () => {
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${input.value}&include_adult=false&language=en-US&page=1&api_key=8ea68237379782a56cf3b4b12d40f1d9`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      const datum = data.results;
      if (datum.length === 0) {
        main.replaceChildren();
        const movieEl = document.createElement("div");
        movieEl.innerHTML = `<div>
          <h2 class="text-light">No results Found:)</h2>
          </div>`;
        main.appendChild(movieEl);
      } else {
        const main = document.getElementById("main");
        main.replaceChildren();
        datum.forEach((element, index) => {
          console.log(element);
          const movieEl = document.createElement("div");
          movieEl.classList.add("movie");
          movieEl.innerHTML = `
            <a href="https://www.google.com">
            <div class="moviecard text-light d-flex flex-column align-items-center" >
            <img src="https://image.tmdb.org/t/p/w200/${datum[index].poster_path}" alt="title" />
            <div class="movie-info">
                  <h5 class="text-center">${datum[index].title}</h5>
                  <h6>${datum[index].vote_average}/10</h6>
                </div>
              </div>
              </a>  
                `;
          movieEl.setAttribute("id", datum[index].id);
          main.appendChild(movieEl);
        });
      }
    })
    .catch((error) => console.log(error));
});

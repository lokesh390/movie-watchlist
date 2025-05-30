const apiKey = "8b4bdc21"; 
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const movieList = document.getElementById("movie-list");


document.addEventListener("DOMContentLoaded", () => {
    loadStaticMovies();
});


searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (query) {
        const movies = await searchMovies(query);
        renderMovies(movies);
    }
});

async function searchMovies(query) {
    try {
        const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`);
        const data = await res.json();
        return data.Search || [];
    } catch (error) {
        console.error("Failed to fetch movies", error);
        return [];
    }
}


function renderMovies(movies) {
    movieList.innerHTML = "";
    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}" width="150">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
            <button onclick="addToWatchlist('${movie.imdbID}')">Add to Watchlist</button>
        `;
        movieList.appendChild(card);
    });
}

function addToWatchlist(imdbID) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (!watchlist.includes(imdbID)) {
        watchlist.push(imdbID);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert("Movie added to watchlist!");
    } else {
        alert("Movie already in watchlist.");
    }
}


function loadStaticMovies() {
   
}


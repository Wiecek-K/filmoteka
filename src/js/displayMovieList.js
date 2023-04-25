import { decodeGenreId } from "./genres";
import { showLoader, removeLoader } from "./loader";
import { showModal, renderModal } from "./modal";
import { fetchMovieById } from "./modal";
export function displayMovies(movies, maxGenres = 2) {
	const moviesContainer = document.getElementById("movies-gallery");
	moviesContainer.innerHTML = "";
	movies.forEach(async (movie) => {
		const genres = movie.genre_ids
			.slice(0, maxGenres)
			.map((id) => decodeGenreId(id))
			.join(", ");
		const movieCard = `
        <div data-id=${movie.id} class="movie-card">
          <div class="movie-card__placeholder"><img class="movie-card__image" alt=" " src="https://image.tmdb.org/t/p/w500${
						movie.poster_path
					}" alt="${movie.title}" width="395" height="574"></div>
          <h2 class="movie-card__tittle">${movie.title}</h2>
          <p class="movie-card__info"> 
          <span class="movie-card__overview">${
						movie.genre_ids.length > 2 ? `${genres}, other` : genres
					}</span> | <span class="movie-card__realease-date">${movie.release_date.slice(
			0,
			4,
		)}
      `;
		moviesContainer.insertAdjacentHTML("beforeend", movieCard);
	});
	moviesContainer.addEventListener("click", (e) => {
		if (e.target.closest(".movie-card") === null) {
			return;
		}
		showLoader();
		showModal();
		fetchMovieById(e.target.closest(".movie-card").dataset.id).then((movie) => {
			renderModal(movie);
			removeLoader();
		});
	});
}

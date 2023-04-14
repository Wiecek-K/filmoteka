const filmList = document.querySelector(".filmList");
const API_KEY = "964358699754c21d74c014b561cf196c";
console.log("lista", filmList);
export async function fetchFilmList(name, page = 1) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=1&language=en-US`,
		);
		const json = await response.json();
		return json;
	} catch (err) {
		Notify.failure("ERROR", err);
	}
}
export async function fetchGenres() {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
		);
		return response.json();
	} catch (err) {
		Notify.failure("ERROR", err);
	}
}
function createFilmMarkup({
	original_title,
	backdrop_path,
	original_language,
}) {
	return `
    <div class="photo-card">
        <a href=${largeImageURL}>
            <img src=${webformatURL} alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
            <div class="info-item">
                <h5>Likes</h5>
                <p>${likes}</p>
            </div>
            <div class="info-item">
                <h5>Views</h5>
                <p>${views}</p>
            </div>
            <div class="info-item">
                <h5>Comments</h5>
                <p>${comments}</p>
            </div>
            <div class="info-item">
                <h5>Downloads</h5>
                <p>${downloads}</p>
            </div>
        </div>
	</div>`;
}

Promise.all([fetchGenres(), fetchFilmList()]).then((r) => {
	const [genres, films] = r;
	console.log("all", genres.genres, films.results);
});

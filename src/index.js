const filmList = document.querySelector(".filmList");
const API_KEY = "964358699754c21d74c014b561cf196c";
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
			//https://api.themoviedb.org/3/genre/movie/list?api_key=964358699754c21d74c014b561cf196c&language=en-US
		);
		return response.json();
	} catch (err) {}
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

const genres = [
	{ id: 28, name: "Action" },
	{ id: 12, name: "Adventure" },
	{ id: 16, name: "Animation" },
	{ id: 35, name: "Comedy" },
	{ id: 80, name: "Crime" },
	{ id: 99, name: "Documentary" },
	{ id: 18, name: "Drama" },
	{ id: 10751, name: "Family" },
	{ id: 14, name: "Fantasy" },
	{ id: 36, name: "History" },
	{ id: 27, name: "Horror" },
	{ id: 10402, name: "Music" },
	{ id: 9648, name: "Mystery" },
	{ id: 10749, name: "Romance" },
	{ id: 878, name: "Science Fiction" },
	{ id: 10770, name: "TV Movie" },
	{ id: 53, name: "Thriller" },
	{ id: 10752, name: "War" },
	{ id: 37, name: "Western" },
];

const decodeGenreId = (id) => {
	return genres.find((genre) => genre.id === id).name;
};


import {
	BASE_URL,
	API_KEY,
	setCurrentAPIquery,
	setHeaderAlert,
	fetchAPI,
	setCurrentPage,
} from "./basic";

const searchButton = document.querySelector(".search-form--button");
const searchInput = document.querySelector(".search-form--input");
searchButton.addEventListener("click", handleSearch);

async function handleSearch(e) {
	e.preventDefault();
	setCurrentPage(1);
	const query = searchInput.value;
	if (query.length <= 2) {
		setHeaderAlert(
			"Search result not successful. Enter the correct movie name",
		);
		return;
	}
	setCurrentAPIquery(
		`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=1`,
	);
	setHeaderAlert("");
	fetchAPI();
}

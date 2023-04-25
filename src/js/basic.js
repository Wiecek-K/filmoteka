import { showLoader, removeLoader } from "./loader";
import { displayMovies } from "./displayMovieList";

export const BASE_URL = "https://api.themoviedb.org/3";
export const API_KEY = "964358699754c21d74c014b561cf196c";
let currentPage = 1;
let currentAPIquery = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${currentPage}`;
let lastPage;

const headerAlert = document.querySelector(".notification-alert");

export const setCurrentAPIquery = (link) => {
	currentAPIquery = link;
};
export const setCurrentPage = (index) => {
	currentPage = index;
};
export const setHeaderAlert = (text) => {
	headerAlert.textContent = text;
};

export const fetchAPI = async () => {
	console.log(currentAPIquery);
	showLoader();
	try {
		const response = await fetch(currentAPIquery);
		const data = await response.json();
		console.log(data);
		if (data.total_results === 0) {
			setHeaderAlert(
				"Search result not successful. Enter the correct movie name",
			);
		}
		const movies = data.results;
		lastPage = data.total_pages > 500 ? 500 : data.total_pages;
		window.scroll({
			top: 0,
			behavior: "instant",
		});
		buildPaginationNumbers();
		displayMovies(movies);
		removeLoader();
	} catch (error) {
		console.error(error);
		removeLoader();
	}
};

export const buildCurrentAPIquery = () => {
	currentAPIquery = `${currentAPIquery.slice(
		0,
		currentAPIquery.indexOf("page"),
	)}
		page=${currentPage}`;
};
const paginatedList = document.getElementById("paginated-list");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const mql = window.matchMedia("(min-width: 768px)");

const appendPageNumber = (index) => {
	active = index === currentPage ? "active" : "";
	const markup = ` <li class="pagination-number pagination-button ${active}" page-index="${index}">
   <p>${index}</p>
  </li>`;
	paginatedList.innerHTML += markup;
};
const threeDots = ` <li class="pagination-number pagination-button pagination-three-dots page-index="0">
<p>...</p>
</li>`;

const buildPaginationNumbers = () => {
	clearPaginationNumbers();
	let start = currentPage;
	let shift = 0;
	if (lastPage > 5 && lastPage - currentPage < 5) {
		start = lastPage - 2;
	}
	while (start > 1 && shift < 2) {
		start--;
		shift++;
	}
	shift = 0;
	if (mql.matches) {
		if (start > 1) {
			appendPageNumber(1);
			paginatedList.innerHTML += threeDots;
		}
	}
	while (shift < 5 && start <= lastPage) {
		appendPageNumber(start);
		start++;
		shift++;
	}
	if (mql.matches) {
		if (start < lastPage) {
			paginatedList.innerHTML += threeDots;
			appendPageNumber(lastPage);
		}
	}
	prevButton.disabled = currentPage === 1 ? true : false;
	nextButton.disabled = currentPage === lastPage ? true : false;
};
mql.addListener(buildPaginationNumbers);
const clearPaginationNumbers = () => {
	paginatedList.innerHTML = "";
};
paginatedList.addEventListener("click", loadNewPage);
function loadNewPage(e) {
	const scrapedIndex =
		e.target.closest(".pagination-number").getAttribute("page-index") - 0;
	if (scrapedIndex === currentPage || scrapedIndex === 0) {
		return;
	}
	currentPage = scrapedIndex;
	buildCurrentAPIquery();
	console.log("CP", currentPage);
	fetchAPI();
}
nextButton.addEventListener("click", () => {
	currentPage++;
	prevButton.disabled = false;
	buildCurrentAPIquery();
	fetchAPI();
});
prevButton.addEventListener("click", () => {
	currentPage--;
	nextButton.disabled = true;
	buildCurrentAPIquery();
	fetchAPI();
});

const e=document.querySelector(".footer-highlight"),t=document.querySelector(".modal-devs");function a(){t.classList.add("modal-devs-hidden")}document.querySelectorAll("[data-slider-button]").forEach((e=>{e.addEventListener("click",(()=>{const t="next"===e.dataset.sliderButton?1:-1,a=e.closest(".modal-devs__slider").querySelector(".modal-devs__slide-list"),c=a.querySelector("[data-active]");let n=[...a.children].indexOf(c)+t;n<0&&(n=a.children.length-1),n>=a.children.length&&(n=0),a.children[n].dataset.active=!0,delete c.dataset.active}))})),e.addEventListener("click",(function(){t.classList.remove("modal-devs-hidden")})),window.addEventListener("keydown",(e=>{"Escape"===e.key&&a()})),window.addEventListener("click",(e=>{e.target.classList.contains("modal-devs")&&a()}));const c=JSON.parse(localStorage.getItem("queue")),n=JSON.parse(localStorage.getItem("watched")),d=document.querySelector("#queue-btn"),i=document.querySelector("#watched-btn"),s="3453ae595a5d53cbc877c6d05de8a002",o="https://api.themoviedb.org/3";function r(e,t=2){const a=document.querySelector("#library-gallery");a.innerHTML="",e.forEach((async e=>{const c=(await async function(e){const t=await fetch(`${o}/movie/${e}?api_key=${s}`);return(await t.json()).genres}(e.id)).map((e=>e.name)),n=(c.length>t?c.slice(0,t).concat(["other"]):c).join(", "),d=`\n      <div data-id=${e.id} class="movie-card">\n        <img class="movie-card__image" src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.title}" width="395" height="574">\n        <h2 class="movie-card__tittle">${e.title}</h2>\n        <p class="movie-card__info"> \n        <span class="movie-card__overview">${n}</span> | <span class="movie-card__realease-date">${e.release_date.slice(0,4)}\n    `;a.insertAdjacentHTML("beforeend",d)})),a.addEventListener("click",(e=>{null!==e.target.closest(".movie-card")&&(showLoader(),showModal(),l(e.target.closest(".movie-card").dataset.id).then((e=>{renderModal(e),removeLoader()})))}))}d.addEventListener("click",(async()=>{r(await m(c))})),i.addEventListener("click",(async()=>{r(await m(n))}));const l=async e=>{try{const t=await fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=964358699754c21d74c014b561cf196c&language=en-US`);return await t.json()}catch(e){console.log(e)}};async function m(e){return await Promise.all(e.map((async e=>await l(e))))}
//# sourceMappingURL=library.f4d6b1b4.js.map

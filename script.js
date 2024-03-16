const searchbtn = document.querySelector(".search-btn");
const searcharea = document.querySelector(".search-area");
const searchclose = document.querySelector(".search-close");
const searchinput = document.querySelector(".input-search");
const searchform = document.querySelector(".search-form");

searchbtn.addEventListener("click", function (e) {
  e.preventDefault();
  searcharea.classList.add("search-show");
  searchinput.focus();
});

searchclose.onclick = () => {
  searcharea.classList.remove("search-show");
};

window.addEventListener("click", function (e) {
  //   if(!searchform.contains(e.target))
  if (!searchform.contains(e.target) && !searchbtn.contains(e.target)) {
    searcharea.classList.remove("search-show");
  }
});

function getsurah() {
  const url = `https://equran.id/api/v2/surat`;

  fetch(url, {
    method: "GET",
  })
    .then((response) => {
      if (!response) {
        throw new Error(Response.status);
      }
      return response.json();
    })
    .then(({ data }) => {
      data.forEach((quran) => {
        console.log(quran);
      });
    });
}

getsurah();

// function

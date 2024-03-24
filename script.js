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
      loadingscreen();
      return response.json();
    })
    .then(({ data }) => {
      let list = "";

      data.forEach((quran) => {
        list += template(quran);
      });

      const body = document.querySelector(".body-content");
      body.innerHTML = list;

      const datas = data;
      sort(datas); //panggil function sort
    })
    .catch((err) => {
      console.log(err);
    });
}

// window.addEventListener("click", function (e) {
//   if (e.target.classList.contains("box")) {
//     const id = e.target.dataset.id;
//     console.log(id);
//   }
// });

getsurah();

//membuat menjadi Descanding dan Ascending
const select = document.querySelector("#option");
function sort(datas) {
  select.onchange = function () {
    let data = datas.reverse();

    let list = "";

    data.forEach((quran) => {
      list += template(quran);
    });
    const body = document.querySelector(".body-content");

    body.innerHTML = list;
  };
}

function template(quran) {
  return ` <li class="box" onclick="location.href='surat.html?/${quran.nomor}'">

            <div class="box-left">
              <div class="border">
                <div class="number">
                  <span> ${quran.nomor} </span>
                </div>
                <img src="images/border.png" alt="" />
              </div>
              <div class="title">
                <h4 class="chapt">${quran.namaLatin}</h4>
                <h6 class="detail">
                  <span class="translate">${quran.arti}</span>
                </h6>
              </div>
            </div>
            <div class="box-right">
              <h4 class="arabic">${quran.nama}</h4>
              <h6><span class="ayat">${quran.jumlahAyat} Ayat</span></h6>
            </div>
     
          </li>`;
}

document.addEventListener("DOMContentLoaded", function (event) {
  var scrollpos = localStorage.getItem("scrollpos");
  if (scrollpos) window.scrollTo(0, scrollpos);
});

window.onscroll = function (e) {
  localStorage.setItem("scrollpos", window.scrollY);
};

function loadingscreen() {
  const load = document.querySelector(".footer");
  setTimeout(() => {
    load.classList.add("active");
  }, 500);
}

const body = document.querySelector("body");
const toggle = document.querySelector(".toggle");
const key = "lightdark";

window.addEventListener("DOMContentLoaded", function () {
  const obj = getLS();

  if (obj.length > 0 && obj[0].enable) {
    body.classList.add("active");
  } else {
    body.classList.remove("active");
  }
});

toggle.addEventListener("click", function () {
  body.classList.toggle("active");

  if (body.classList.contains("active")) {
    lightdark(true);
  } else {
    lightdark(false);
  }
});

function lightdark(enable) {
  const obj = { enable };

  localStorage.setItem(key, JSON.stringify([obj]));
}

function getLS() {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}
const booktoggle = document.querySelector(".booktoggle");
const bookmark = document.querySelector(".bookmark");
const booklist = document.querySelector(".book-list");

booktoggle.addEventListener("click", function () {
  bookmark.classList.toggle("show");
});

window.addEventListener("DOMContentLoaded", function () {
  let book = getBookLS();
  const booklist = document.querySelector(".book-list");

  book.forEach((book) => {
    let isi = "";
    const nSurah = book.nSurah;
    const nomor = book.nomor;
    const arab = book.arab;
    const newNomor = nomor.split(":");
    const surah = newNomor[0];
    const ayat = newNomor[1];
    isi += templateMark(nSurah, nomor, arab);

    booklist.insertAdjacentHTML("beforeend", isi);

    const limark = document.querySelector(".mark");
    if (limark) {
      booktoggle.style.display = "grid";
    } else {
      booktoggle.style.display = "none";
    }
    // goToMark(surah, ayat, nomor);
  });
});
window.addEventListener("click", function (e) {
  addToBookmark(e);
  removeToBookmark(e);
});
function addToBookmark(e) {
  if (e.target.classList.contains("book")) {
    e.target.textContent = "bookmark_added";
    e.target.style.color = "#176b87";

    setInterval(() => {
      e.target.textContent = "bookmark_add";
      e.target.style.color = "#555";
    }, 700);

    const tagLI = e.target.parentElement.parentElement;
    const tagP = e.target.parentElement.firstElementChild;
    const halSurah = tagLI.parentElement.parentElement;
    const nomor = tagP.textContent;
    const arab = tagLI.querySelector(".arabic-text").textContent;
    const nSurah = halSurah.querySelector(".namalatin").textContent;

    const newNo = nomor.split(":");
    const surah = newNo[0];
    const ayat = newNo[1];
    let list = "";

    list += templateMark(nSurah, nomor, arab);

    booklist.insertAdjacentHTML("beforeEnd", list);

    addBookLS(nomor, nSurah, arab, surah, ayat);

    const Limark = document.querySelector(".mark");

    showbookmark(Limark);
  }
}
window.addEventListener("click", function (e) {
  if (e.target.classList.contains("noMark")) {
    const nomor = e.target.parentElement.parentElement.dataset.id;

    const newNomor = nomor.split(":");
    const surah = newNomor[0];
    const ayat = newNomor[1];
    window.location.href = `surat.html?/${surah}/${ayat}`;

    removeToBookmark(e);
    removeBookLs(nomor);
  } else if (e.target.classList.contains("goto")) {
    const nomor = e.target.parentElement.dataset.id;
    const newNomor = nomor.split(":");
    const surah = newNomor[0];
    const ayat = newNomor[1];
    window.location.href = `surat.html?/${surah}/${ayat}`;

    removeToBookmark(e);
    removeBookLs(nomor);
  }
});

// function goToMark(e) {
//   const nomor = e.getAttribute("data-id");
//   const newNomor = nomor.split(":");
//   const surah = newNomor[0];
//   const ayat = newNomor[1];

//   window.location.href = `surat.html?/${surah}/${ayat}`;
//   removeToBookmark(e);
//   removeBookLs(nomor);
// }

function templateMark(nSurah, nomor, arab) {
  return `<li class="mark goto"  data-id="${nomor}">
                      <h6 class="book-surah goto">${nSurah}
                        <p class="noMark goto">${nomor}</p> 
                      </h6>

                      <span class="book-arab goto"
                        >${arab}</span
                      >
                      <span class="material-symbols-outlined remove">
                        bookmark_remove
                        </span>
                    </li>`;
}

function removeToBookmark(e) {
  if (e.target.classList.contains("remove")) {
    const Limark = document.querySelectorAll(".mark");
    const temukanData = {};
    const no = e.target.parentElement.dataset.id;
    removeBookLs(no);
    e.target.parentElement.remove();
    Limark.forEach((mark) => {
      const no = mark.querySelector(".noMark").textContent;

      if (!temukanData[no]) {
        temukanData[no] = mark;
      } else {
        temukanData[no].remove();
        mark.remove();
      }
    });
  }

  if (booklist.innerHTML == "") {
    booktoggle.style.display = "none";
    bookmark.classList.remove("show");
  }
}

function showbookmark(Limark) {
  if (Limark) {
    booktoggle.style.display = "grid";
  } else {
    booktoggle.style.display = "none";
  }
}

function addBookLS(nomor, nSurah, arab, surah, ayat) {
  const obj = { nomor, nSurah, arab, surah, ayat };

  let book = getBookLS();

  book.push(obj);

  localStorage.setItem("mark", JSON.stringify(book));
}

function removeBookLs(no) {
  let book = getBookLS();

  book = book.filter((books) => books.nomor !== no);

  localStorage.setItem("mark", JSON.stringify(book));
  if (book.length == 0) {
    localStorage.removeItem("mark");
  }
}

function getBookLS() {
  return localStorage.getItem("mark")
    ? JSON.parse(localStorage.getItem("mark"))
    : [];
}

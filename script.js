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
  const storedData = getLs(); // Ambil data dari localStorage
  if (storedData.length > 0 && storedData[0].enable) {
    body.classList.add("active"); // Tambahkan kelas 'active' jika data tersimpan dan enable true
  }
});

toggle.addEventListener("click", () => {
  body.classList.toggle("active");
  lightDrake(body.classList.contains("active")); // Kirim nilai berdasarkan apakah 'active' ada di body atau tidak
});

function lightDrake(enable) {
  const obj = { enable };
  localStorage.setItem(key, JSON.stringify([obj])); // Simpan data baru sebagai array tunggal
}

function getLs() {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

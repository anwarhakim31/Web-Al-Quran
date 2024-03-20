// Get the URL
let url = new URL(window.location.href);

// Get the searchParams object from the URL
let searchParams = url.searchParams;

// Get the pathname (after the ?)
let pathname = url.search.slice(1);

// Split the pathname using '/' as the delimiter
let parts = pathname.split("/");
// Get the value of the letiable "surat"
let variableValue = parts[1]; // Get the second part (index 1)
let nextpage;

// Output the value
var lastscrolltop = 0;
currentAudioIndex = 0;

window.addEventListener("scroll", () => {
  let scrolltop = window.pageYOffset || document.documentElement.scrolltop;

  if (scrolltop > lastscrolltop) {
  } else {
  }
});

const url1 = `https://equran.id/api/v2/surat/`;
const url2 = `http://api.alquran.cloud/v1/surah/`;

const request1 = fetch(url1 + variableValue).then((response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
});
const request2 = fetch(url2 + variableValue).then((response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
});

const nextbtn = document.querySelector(".next-btn");
const prevbtn = document.querySelector(".prev-btn");
const toTop = document.querySelector(".ToTop-btn");
const detailpage = document.querySelector(".detail");

Promise.all([request1, request2])
  .then(([data1, data2]) => {
    document.querySelector(".arabicname").textContent = data2.data.name;

    document.querySelector(".part").textContent = data1.data.tempatTurun;
    document.querySelector(".total").textContent = data1.data.jumlahAyat;
    document.querySelector(".namalatin").textContent = data1.data.namaLatin;
    const bodysurat = document.querySelector(".body-surat");

    const ayat = data1.data.ayat;

    loadingscreen();

    const noSurah = data1.data.nomor;
    let isi = "";

    ayat.forEach((ayat, i) => {
      const audio = ayat.audio;
      const getvalue = Object.values(audio);
      const value = getvalue[4];

      ayat.no = convertToArabic(ayat.nomorAyat);
      isi += template(ayat, noSurah, value, i);
    });
    bodysurat.innerHTML = isi;

    getAudioSrc();

    const variableValue1 = data1.data.suratSebelumnya.nomor;
    const variableValue2 = data1.data.suratSelanjutnya.nomor;
    getPrev(variableValue1);
    getNext(variableValue2);
  })
  .catch((eror) => {
    console.log(eror);
  });

const audioplayer = document.querySelector(".audio-player");

function getAudioSrc() {
  //mengambil semua audio yang ada di seleurh element Li
  const audioElements = document.querySelectorAll(".body-surat audio");

  const srcArray = [];
  //mememasukkan semua  source yang ada di audio
  audioElements.forEach((audio) => {
    srcArray.push(audio.getAttribute("src"));
  });

  srcArray.forEach((src) => {
    //membuat element source sesuai banyaknya index array
    const srcElement = document.createElement("source");
    //memasukan src pada  semua element source
    srcElement.setAttribute("src", src);

    //lalu memasukan semua srcElement yang sudah ada srcnya ke element audio player
    audioplayer.appendChild(srcElement);
  });

  //next prev btn surah
  btnNext(srcArray);
  btnPre(srcArray);

  //saat audio mau habis berganti surah
  audioplayer.addEventListener("ended", function () {
    nextSurah(srcArray);
  });

  audioplayer.src = srcArray[currentAudioIndex];
}

const PlayPause = document.querySelector(".play-pause");
const container = document.querySelector(".container");

////////////////////////////////////////////////////////////
function playmusic() {
  container.classList.add("active");
  audioplayer.play();
  PlayPause.textContent = "pause";
}
function pausemusic() {
  container.classList.remove("active");
  audioplayer.pause();
  PlayPause.textContent = "play_arrow";
}
PlayPause.addEventListener("click", function () {
  container.classList.contains("active") ? pausemusic() : playmusic();
});
///////////////////////////////////////////////////////////////
function nextSurah(srcArray) {
  currentAudioIndex++;

  if (currentAudioIndex >= srcArray.length) {
    currentAudioIndex = 0;
  }

  audioplayer.setAttribute("src", srcArray[currentAudioIndex]);
  playmusic();
}

function prevSurah(srcArray) {
  currentAudioIndex--;

  if (currentAudioIndex < 0) {
    currentAudioIndex = srcArray.length - 1;
  }

  audioplayer.setAttribute("src", srcArray[currentAudioIndex]);
  playmusic();
}

function btnNext(srcArray) {
  const forwardbtn = document.querySelector(".forward-btn");
  forwardbtn.addEventListener("click", function () {
    nextSurah(srcArray);
  });
}

function btnPre(srcArray) {
  const rewindBtn = document.querySelector(".rewind-btn");

  rewindBtn.addEventListener("click", function () {
    prevSurah(srcArray);
  });
}

// Tambahkan event listener untuk menangani saat metadata audio telah dimuat
audioplayer.addEventListener("loadedmetadata", function () {
  // Durasi audio tersedia setelah metadata audio dimuat
  const durationInSeconds = audioplayer.duration; // Durasi audio dalam detik
  console.log("Durasi audio:", durationInSeconds, "detik");
});

// Memuat metadata audio
audioplayer.load();

// window.addEventListener("click", function (e) {
//   const btnplay = e.target;
//   if (btnplay.classList.contains("play")) {
//     const audio = btnplay.previousElementSibling;
//     audioplayer.setAttribute("src", audio.src);
//     playmusic();
//   }
// });

// <!-- button pagination -->//

toTop.addEventListener("click", function () {
  window.scrollTo(0, 0);
});

function hiddenbtn(vbtn, detailbtn) {
  if (
    vbtn == undefined &&
    detailbtn.parentElement.classList.contains("next-btn")
  ) {
    detailbtn.setAttribute("href", "");

    nextbtn.classList.add("hidden-pagination");
    return;
  } else if (
    vbtn == undefined &&
    detailbtn.parentElement.classList.contains("prev-btn")
  ) {
    prevbtn.classList.add("hidden-pagination");
  }
}

function getPrev(variableValue1) {
  const aPrev = prevbtn.firstElementChild;
  aPrev.setAttribute("href", `surat.html?/${variableValue1}`);
  hiddenbtn(variableValue1, aPrev);
}

function getNext(variableValue2) {
  const aNext = nextbtn.firstElementChild;
  aNext.setAttribute("href", `surat.html?/${variableValue2}`);
  hiddenbtn(variableValue2, aNext);
}
//==================================================================//

function template(ayat, noSurah, value, i) {
  return `<li class="ayat" li-index="${i + 1}">
            
            <div class="navigation">
              <p class="no-noayat">${noSurah}:${ayat.nomorAyat}</p>
              <audio src="${value}" class="audios"></audio>
              <span class="material-symbols-outlined play"> play_arrow </span>
                  
              <span class="material-symbols-outlined"> bookmarks </span>
              <span class="material-symbols-outlined"> content_copy </span>
            </div>
            <div class="text">
                <div class="arabic-text">${ayat.teksArab}
              <span class="symbol">۝<span class="number">${
                ayat.no
              }</span></span>
            </div>
              <p class="latin-text">${ayat.teksLatin}</p>
              <span class="arti-text">${ayat.teksIndonesia}</span>
            </div>
          </li>`;
}

function loadingscreen() {
  const load = document.querySelector(".loader");

  load.classList.add("loader-hidden");
}

const toggle = document.querySelector(".toggle");
const body = document.querySelector("body");

function convertToArabic(number) {
  const arabicNumerals = ["۰", "۱", "۲", "۳", "٤", "۵", "٦", "۷", "۸", "۹"];
  const digits = number.toString().split("");
  let arabicNumber = "";

  for (let i = 0; i < digits.length; i++) {
    if (!isNaN(digits[i])) {
      arabicNumber += arabicNumerals[parseInt(digits[i])];
    } else {
      arabicNumber += digits[i];
    }
  }

  return arabicNumber;
}
//  <!--  keep scroll postion -->//
document.addEventListener("DOMContentLoaded", function (event) {
  var scrollpos = localStorage.getItem("scrollpos");
  if (scrollpos) window.scrollTo(0, scrollpos);
});

window.onscroll = function (e) {
  localStorage.setItem("scrollpos", window.scrollY);
};

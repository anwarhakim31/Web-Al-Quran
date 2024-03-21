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

const header = document.querySelector("header");
const bnav = document.querySelector(".bnav");
const updown = document.querySelector(".updown");
const containers = document.querySelector(".container");
const sidebar = document.querySelector(".sidebar");

window.addEventListener("scroll", () => {
  let scrolltop = window.pageYOffset || document.documentElement.scrolltop;

  if (scrolltop > lastscrolltop) {
    header.classList.add("active");
    bnav.classList.add("active");
    sidebar.classList.remove("down");
  } else {
    header.classList.remove("active");
    bnav.classList.remove("active");
    sidebar.classList.add("down");
  }
});

updown.addEventListener("click", function () {
  sidebar.classList.toggle("show");
  containers.classList.toggle("shift");

  if (updown.textContent === "arrow_drop_down") {
    updown.textContent = "arrow_drop_up";
  } else {
    updown.textContent = "arrow_drop_down";
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
    document.querySelector(".name").textContent = data1.data.namaLatin;
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

    getAudioSrc(); //function getaudiosrc

    const variableValue1 = data1.data.suratSebelumnya.nomor;
    const variableValue2 = data1.data.suratSelanjutnya.nomor;
    getPrev(variableValue1);
    getNext(variableValue2);
  })
  .catch((eror) => {
    console.log(eror);
  });
const mediaplayer = document.querySelector(".media-player");
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

  //saat audio mau habis berganti ayat
  audioplayer.addEventListener("ended", function () {
    const liayat = document.querySelectorAll(".ayat");
    liayat.forEach((li) => {
      if (currentAudioIndex == srcArray.length - 1) {
        li.classList.remove("bgcolor");
      }
    });

    if (currentAudioIndex == srcArray.length - 1) {
      mediaplayer.classList.remove("show");
    } else {
      nextSurah(srcArray);
    }
  });

  audioplayer.src = srcArray[currentAudioIndex];
  playbodybtn(srcArray);
  copytextbtn();
}

function playbodybtn(srcArray) {
  window.addEventListener("click", function (e) {
    const btnplay = e.target;
    if (btnplay.classList.contains("play")) {
      const li = btnplay.parentElement.parentElement;
      const liIndex = li.getAttribute("li-index");
      currentAudioIndex = liIndex;
      audioplayer.setAttribute("src", srcArray[currentAudioIndex]);

      playmusic();

      li.classList.add("bgcolor");
      viewSroll();
    }
  });
}

function copytextbtn() {
  const copy = document.querySelectorAll(".copy");

  copy.forEach((copy) => {
    copy.onclick = (e) => {
      const li = e.target.parentElement.parentElement;

      const arabicText = li.querySelector(".arabic-text").textContent;
      const artiText = li.querySelector(".arti-text").textContent;
      const noayatt = li.querySelector(".no-noayat").textContent;
      const newarabicText = arabicText.split("۝۱");
      // const newarabic = newarabicText.split("۱")
      const Text = newarabicText.join("\n");
      const textCopy = `${noayatt} ${Text}
          ${artiText}`;
      console.log(textCopy);
      navigator.clipboard.writeText(textCopy);
    };
  });
}

const PlayPause = document.querySelector(".play-pause");
const container = document.querySelector(".container");

////////////////////////////////////////////////////////////
function playmusic() {
  container.classList.add("active");
  audioplayer.play();
  PlayPause.textContent = "pause";
  mediaplayer.classList.add("show");
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
    currentAudioIndex = srcArray.length - 1;
  }

  audioplayer.setAttribute("src", srcArray[currentAudioIndex]);
  playmusic();

  viewSroll();
}

function prevSurah(srcArray) {
  currentAudioIndex--;

  if (currentAudioIndex < 0) {
    currentAudioIndex = 0;
  }

  audioplayer.setAttribute("src", srcArray[currentAudioIndex]);
  playmusic();

  // Gulirkan ke elemen <li> yang dipilih
  viewSroll();
}

function viewSroll() {
  const Li = document.querySelectorAll(".ayat");

  Li.forEach((liAyat) => {
    if (liAyat.classList.contains("bgcolor")) {
      liAyat.classList.remove("bgcolor");
    }

    if (liAyat.getAttribute("li-index") == currentAudioIndex) {
      const currentLi = document.querySelector(
        `li[li-index="${currentAudioIndex}"]`
      );
      if (currentLi) {
        currentLi.classList.add("bgcolor");
        currentLi.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });
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

function zero(nomor) {
  return nomor < 10 ? "0" + nomor : nomor;
}

const progresbar = document.querySelector(".progres-bar");
let currentT = document.querySelector(".current");
let durationT = document.querySelector(".duration");

audioplayer.addEventListener("timeupdate", function (e) {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progresWidth = (currentTime / duration) * 100;
  progresbar.style.width = `${progresWidth}%`;

  audioplayer.addEventListener("loadeddata", function () {
    let audioDuration = e.target.duration;
    let tmenit = Math.floor(audioDuration / 60);
    let tdetik = Math.floor(audioDuration % 60);

    tmenit = zero(tmenit);
    tdetik = zero(tdetik);
    durationT.innerText = `${tmenit}:${tdetik}`;
  });

  let tmenit = Math.floor(currentTime / 60);
  let tdetik = Math.floor(currentTime % 60);
  tmenit = zero(tmenit);
  tdetik = zero(tdetik);
  currentT.innerText = `${tmenit}:${tdetik}`;
});

const progrestArea = document.querySelector(".progres-area");

progrestArea.addEventListener("click", (e) => {
  let progressWidth = progrestArea.clientWidth; //
  let clickedOffsetX = e.offsetX; //getting offset x value
  let songDuration = audioplayer.duration; //getting song total duration

  audioplayer.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playmusic();
});

const closeBtn = document.querySelector(".close-btn");

closeBtn.addEventListener("click", function () {
  mediaplayer.classList.remove("show");
  pausemusic();
});

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
  return `<li class="ayat" li-index="${i}">
            
            <div class="navigation">
              <p class="no-noayat">${noSurah}:${ayat.nomorAyat}</p>
              <audio src="${value}" class="audios"></audio>
              <span class="material-symbols-outlined play"> play_arrow </span>
                  
              <span class="material-symbols-outlined book"> bookmarks </span>
              <span class="material-symbols-outlined copy"> content_copy </span>
            </div>
            <div class="text">
                <div class="arabic-text">${ayat.teksArab}
              <span class="symbol">۝<span class="number">${ayat.no}</span></span>
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

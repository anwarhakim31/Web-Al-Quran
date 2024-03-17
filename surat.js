// Get the URL
var url = new URL(window.location.href);

// Get the searchParams object from the URL
var searchParams = url.searchParams;

// Get the pathname (after the ?)
var pathname = url.search.slice(1);

// Split the pathname using '/' as the delimiter
var parts = pathname.split("/");

var part = pathname.split(":");

// Get the value of the variable "surat"
var variableValue = part[1]; // Get the second part (index 1)

// Output the value
console.log(variableValue); // Output: 1

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

Promise.all([request1, request2])
  .then(([data1, data2]) => {
    document.querySelector(".arabicname").textContent = data2.data.name;

    document.querySelector(".part").textContent = data1.data.tempatTurun;
    document.querySelector(".total").textContent = data1.data.jumlahAyat;
    document.querySelector(".namalatin").textContent = data1.data.namaLatin;
    const bodysurat = document.querySelector(".body-surat");

    const ayat = data1.data.ayat;
    loadingscreen();
    // ayat.nomor = convertToArabic(ayat.nomor);
    let isi = "";
    ayat.forEach((ayat) => {
      ayat.no = convertToArabic(ayat.nomorAyat);
      console.log(ayat.nomorAyat);
      isi += template(ayat);
    });

    bodysurat.innerHTML = isi;
  })
  .catch((eror) => {
    console.log(eror);
  });

function template(ayat) {
  return `<li class="ayat">
            <div class="arabic-text">${ayat.teksArab}
              <span class="symbol">۝<span class="number">${ayat.no}</span></span>
            </div>
            <p class="latin-text">
              ${ayat.teksLatin}
            </p>
            <span class="arti-text"
              >${ayat.teksIndonesia}</span
            >
          </li>`;
}

function loadingscreen() {
  const load = document.querySelector(".loader");

  load.classList.add("loader-hidden");
}

const toggle = document.querySelector(".toggle");
const body = document.querySelector("body");

toggle.addEventListener("click", function () {
  body.style.backroundcolor = black;
});

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

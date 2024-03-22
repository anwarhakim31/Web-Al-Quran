const header = document.querySelector("header");
const bnav = document.querySelector(".bnav");
const updown = document.querySelector(".updown");
const containers = document.querySelector(".container");
const sidebar = document.querySelector(".sidebar");
const close = document.querySelector(".closed");
const searchSurat = document.getElementById("src-surat");
var lastscrolltop = 5;
window.addEventListener("scroll", () => {
  let scrolltop = window.pageYOffset || document.documentElement.scrolltop;

  if (scrolltop > lastscrolltop) {
    header.classList.add("active");
    bnav.classList.add("active");

    sidebar.classList.add("down");
  } else {
    header.classList.remove("active");
    bnav.classList.remove("active");
    sidebar.classList.remove("down");
  }
});

updown.addEventListener("click", function () {
  if (updown.textContent === "arrow_drop_down") {
    updown.textContent = "arrow_drop_up";
    sidebar.style.animation = "sideanimate 0.3s";
    sidebar.classList.add("show");
    containers.classList.add("shift");
  } else {
    updown.textContent = "arrow_drop_down";
    sidebar.style.animation = "sideanimates 0.3s";
    sidebar.classList.remove("show");
    containers.classList.remove("shift");
  }
});

function sideSurah(sideSurat) {
  const ulside = document.querySelector(".list-surat");

  let side = "";
  sideSurat.forEach((ayat, i) => {
    side += `<li class="sSurat">
                  <a href="surat.html?/${ayat.nomor}">
                    <p><span>${ayat.nomor}</span> ${ayat.namaLatin}</p>
                  </a>
                </li>`;
  });
  ulside.innerHTML = side;

  const li = document.querySelectorAll(".sSurat");

  li.forEach((liside) => {
    const url = liside.firstElementChild.getAttribute("href");
    const nomor = url.split("/")[1];
    if (nomor == variableValue) {
      liside.classList.add("active");

      const li = document.querySelector(`.sSurat a[href="${url}"]`);
      if (li) {
        li.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });

  searchSidebarSurah(sideSurat, ulside);
}

function searchSidebarSurah(sideSurat, ulside) {
  // Memasukkan event listener untuk input pencarian
  const searchInput = document.getElementById("src-surat");
  searchInput.addEventListener("input", function () {
    const searchValue = normalizeText(this.value); // Normalisasi nilai pencarian

    // Pisahkan input menjadi nomor surat dan nama surat
    let nomorSurat = null;
    let namaSurat = null;

    const parts = searchValue.match(/(\d+)|\b(\w+)\b/g); // Pisahkan nomor dan kata
    if (parts) {
      parts.forEach((part) => {
        if (!isNaN(part)) {
          nomorSurat = parseInt(part); // Jika bagian adalah nomor, tetapkan ke nomorSurat
        } else {
          namaSurat = part.toLowerCase(); // Jika bagian adalah nama, tetapkan ke namaSurat
        }
      });
    }

    // Memfilter daftar surat berdasarkan nomor surat atau nama Latin
    const filteredSurah = sideSurat.filter((surat) => {
      const nomor = surat.nomor.toString();
      const namaLatin = normalizeText(surat.namaLatin); // Normalisasi nama Latin

      // Cocokkan dengan nomor surat atau nama Latin
      if (nomorSurat && namaSurat) {
        // Gunakan startsWith untuk nomor surat dan includes untuk nama surat
        return (
          nomor.startsWith(nomorSurat.toString()) &&
          namaLatin.includes(namaSurat)
        );
      } else if (nomorSurat) {
        // Jika hanya nomor surat yang ada, gunakan startsWith
        return nomor.startsWith(nomorSurat.toString());
      } else if (namaSurat) {
        // Jika hanya nama surat yang ada, gunakan includes
        return namaLatin.includes(namaSurat);
      } else {
        return false;
      }
    });

    // Menampilkan hasil filter
    ulside.innerHTML = "";
    if (searchValue === "") {
      let side = "";
      sideSurat.forEach((ayat, i) => {
        side += `<li class="sSurat">
                  <a href="surat.html?/${ayat.nomor}">
                    <p><span>${ayat.nomor}</span> ${ayat.namaLatin}</p>
                  </a>
                </li>`;
      });
      ulside.innerHTML = side;
    } else {
      filteredSurah.forEach((surat, i) => {
        ulside.innerHTML += `<li class="sSurat">
                          <a href="surat.html?/${surat.nomor}">
                            <p><span>${surat.nomor}</span> ${surat.namaLatin}</p>
                          </a>
                        </li>`;
      });
    }
  });

  // Fungsi untuk normalisasi teks dengan menghapus tanda hubung dan spasi
  function normalizeText(text) {
    return text.trim().toLowerCase().replace(/-/g, "").replace(/\s+/g, "");
  }
}

searchSurat.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});

function lengthSurat(ayat) {
  const ul = document.querySelector(".list-ayat");
  console.log();
  let nomor = "";
  ayat.forEach((ayat, i) => {
    nomor += `  <li class="sAyat">
                          <p>${ayat.nomorAyat}</p>
                        </li>`;
  });
  ul.innerHTML = nomor;

  window.addEventListener("scroll", function () {
    // Periksa posisi halaman utama untuk setiap bagian
    const liAyat = document.querySelectorAll(".ayat");
    liAyat.forEach((li, i) => {
      const rect = li.getBoundingClientRect();

      // Jika bagian tertentu dalam tampilan, beri warna pada elemen sidebar yang sesuai
      const sAyatElements = document.querySelectorAll(".sAyat");
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        // Setel warna latar belakang untuk elemen sidebar yang sesuai
        sAyatElements[i].scrollIntoView(
          (behavior = "smooth"),
          (block = "center")
        );
        sAyatElements[i].classList.add("active");
      } else {
        // Hapus warna latar belakang jika tidak sesuai
        sAyatElements[i].classList.remove("active");
      }
    });
  });

  searchSidebarNomor(ayat, ul);
}

function searchSidebarNomor(ayat, ul) {
  const searchNomor = document.querySelector("#src-ayat");

  searchNomor.addEventListener("input", function (e) {
    const nomorValue = parseInt(searchNomor.value);

    // Jika input valid, lanjutkan dengan memfilter nomor surat
    const nomor = ayat.filter((no) => {
      // Memeriksa apakah nomorAyat dimulai dengan nomorValue yang diberikan
      return no.nomorAyat.toString().startsWith(nomorValue.toString());
    });

    // Tampilkan hasil filter
    if (searchNomor.value === "") {
      let nomor = "";
      ayat.forEach((ayat, i) => {
        nomor += `  <li class="sAyat">
                          <p>${ayat.nomorAyat}</p>
                        </li>`;
      });
      ul.innerHTML = nomor;
    } else {
      ul.innerHTML = "";
      nomor.map((no) => {
        ul.innerHTML += `<li class="sAyat">
                        <p>${no.nomorAyat}</p>
                      </li>`;
      });
    }
  });

  searchNomor.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
}

// <!-- mengambuat sidebar nomor agar saat diklik di beri backgroud  -->
window.addEventListener("click", function (e) {
  const sAyat = document.querySelectorAll(".sAyat");

  //melakukan perualangan untuk mengambil semua <li> pda sidebar bagian nomor
  sAyat.forEach((number) => {
    // lalu menghapus semua kelas number yang memiliki kelas active
    // <!-- yang jika di bawah di klik kelas yang sebelumnya yang sudah terklik akan hilang -->
    number.classList.remove("active");
  });

  //mengambil semua <li> class ayat pada body utama surah
  const liAyat = document.querySelectorAll(".ayat");

  //jika saat diklik pada sidebar terdapat class ayat maka
  if (e.target.classList.contains("sAyat")) {
    //ambil isi nya berupa nomor
    const number = e.target.firstElementChild.textContent;
    //menabahakan kellas aktif
    e.target.classList.add("active");

    //melakukan perulangan semua tag<li> pada body halaman
    liAyat.forEach((getLi) => {
      //jika <li> class body utama  memeiliki li-index ===
      if (getLi.getAttribute("li-index") == number - 1) {
        // mengambil <tag li> yang memiliki nomor li-index yang sama
        const scrolls = document.querySelector(`li[li-index="${number - 1}"]`);

        if (scrolls) {
          scrolls.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });
  }
});

close.addEventListener("click", function () {
  updown.textContent = "arrow_drop_down";
  sidebar.style.animation = "sideanimates 0.3s";
  sidebar.classList.remove("show");
  containers.classList.remove("shift");
});

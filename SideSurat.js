const header = document.querySelector("header");
const bnav = document.querySelector(".bnav");
const updown = document.querySelector(".updown");
const containers = document.querySelector(".container");
const sidebar = document.querySelector(".sidebar");
const close = document.querySelector(".closed");

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
                    <p><span>${i + 1}</span> ${ayat.namaLatin}</p>
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
}

function lengthSurat(allLi) {
  const ul = document.querySelector(".list-ayat");
  let nomor = "";
  allLi.forEach((ayat, i) => {
    nomor += `  <li class="sAyat">
                   <p>${i + 1}</p>
                 </li>`;
  });
  ul.innerHTML = nomor;
}

window.addEventListener("click", function (e) {
  const sAyat = document.querySelectorAll(".sAyat");

  sAyat.forEach((number) => {
    number.classList.remove("active");
  });

  const liAyat = document.querySelectorAll(".ayat");

  if (e.target.classList.contains("sAyat")) {
    const number = e.target.firstElementChild.textContent;

    e.target.classList.add("active");

    liAyat.forEach((getLi) => {
      if (getLi.getAttribute("li-index") == number - 1) {
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

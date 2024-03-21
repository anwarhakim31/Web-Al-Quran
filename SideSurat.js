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
    sidebar.classList.remove("down");
  } else {
    header.classList.remove("active");
    bnav.classList.remove("active");
    sidebar.classList.add("down");
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
    }
  });
}

close.addEventListener("click", function () {
  updown.textContent = "arrow_drop_down";
  sidebar.style.animation = "sideanimates 0.3s";
  sidebar.classList.remove("show");
  containers.classList.remove("shift");
});

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
import { Catalog } from "./catalog.js";
export function isWebp() {
   // Проверка поддержки webp
   function testWebP(callback) {
      var webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src =
         "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }
   //добавление класса webp или no-webp для HTML
   testWebP(function (support) {
      if (support == true) {
         document.querySelector("body").classList.add("webp");
      } else {
         document.querySelector("body").classList.add("no-webp");
      }
   });
}

export function toggleBurger() {
   var headerBurger = document.querySelector(".header__burger");
   var headerMenu = document.querySelector(".header__menu");
   var headerLink = document.querySelectorAll(".header__list a");
   var headerFilter = document.querySelectorAll(".filter-option")
   var body = document.body;

   headerBurger.addEventListener("click", function (event) {
      headerBurger.classList.toggle("active");
      headerMenu.classList.toggle("active");
      body.classList.toggle("lock");
      headerMenu.classList.toggle("lock");
   });
   headerLink.forEach((item) =>
      item.addEventListener("click", function (event) {
         headerBurger.classList.toggle("active");
         headerMenu.classList.toggle("active");
         body.classList.toggle("lock");
         headerMenu.classList.toggle("lock");
      })
   );
   headerFilter.forEach((item) =>
      item.addEventListener("click", function (event) {
         headerBurger.classList.toggle("active");
         headerMenu.classList.toggle("active");
         body.classList.toggle("lock");
         headerMenu.classList.toggle("lock");
      })
   );
}

export function checkTouchDevice() {
   const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;
   const elements = document.querySelectorAll(".hoverable");
   if (isTouchDevice) {
      elements.forEach((item) => item.classList.remove("hoverable"));
   }
}
function createWayFoto(basicWay) {
   let result;
   let resStart = basicWay.slice(0, -4);
   let resEnd = isWebp() ? ".webp" : ".jpg"; // проверяем поддержку webp
   let a = 1200;
   let b = 992;
   let c = 768;
   let d = 560;
   let e = 320;
   let f = "-min";

   if (window.innerWidth >= a) {
      result = resStart + a + resEnd;
   } else if (window.innerWidth >= b) {
      result = resStart + b + resEnd;
   } else if (window.innerWidth >= c) {
      result = resStart + c + resEnd;
   } else if (window.innerWidth >= d) {
      result = resStart + d + resEnd;
   } else if (window.innerWidth >= e) {
      result = resStart + e + resEnd;
   } else {
      result = resStart + f + resEnd;
   }
   return result;
}
function setFotoPath(selector, path) {
   const imgElement = document.querySelector(selector);
   const fotoPath = createWayFoto(path);
   imgElement.setAttribute("src", fotoPath);
}

export function assignIndexFotoPath() {
   const fotoPaths = [
      { selector: ".main-foto__img", path: "img/main/main-foto.jpg" },
      {
         selector: ".g-repare-foto__img",
         path: "img/guarantee/repare-foto.jpg",
      },
      {
         selector: ".g-service-foto__img",
         path: "img/guarantee/service-foto.jpg",
      },
   ];

   fotoPaths.forEach((foto) => setFotoPath(foto.selector, foto.path));
}

function checkTouchFooter() {
   const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;
   return isTouchDevice;
}
export function qrOnTouchDevice() {
   let hoverFb = document.querySelector(".f-facebook-link");
   let hoverInsta = document.querySelector(".f-insta-link");

   hoverFb.addEventListener("mouseover", function () {
      if (!checkTouchFooter()) {
         let qrBlock = document.getElementById("fbqr");
         qrBlock.classList.add("show-qr");
      }
   });
   hoverFb.addEventListener("mouseout", function () {
      let qrBlock = document.getElementById("fbqr");
      qrBlock.classList.remove("show-qr");
   });

   hoverInsta.addEventListener("mouseover", function () {
      if (!checkTouchFooter()) {
         let qrBlock = document.getElementById("instaqr");
         qrBlock.classList.add("show-qr");
      }
   });
   hoverInsta.addEventListener("mouseout", function () {
      let qrBlock = document.getElementById("instaqr");
      qrBlock.classList.remove("show-qr");
   });
}
export const catalogPage = new Catalog();
export function renderCatalog() {
   Papa.parse("../files/pricelist.csv", {
      download: true,
      header: true,
      skipEmptyLines: "greedy",
      complete: function (results) {
         catalogPage.generateProducts(results.data);
         catalogPage.render();
      },
   });
};
function getFilter(id) {
   const idParts = id.split("_");
   // console.log(idParts);
   const elems = Array.from(document.querySelectorAll(".catalog-item"));
   // console.log(elems);
   elems.forEach((item) => {
      item.classList.add("hide-item");
      item.classList.remove("show-item");
      if (idParts[1] == idParts[2]) {
         item.classList.remove("hide-item");
         item.classList.add("show-item");
      } else if (
         idParts[1] == "all" &&
         item.classList.contains(`season-${idParts[2]}`)
      ) {
         item.classList.remove("hide-item");
         item.classList.add("show-item");
      } else if (
         item.classList.contains(`sex-${idParts[1]}`) &&
         idParts[2] == "all"
      ) {
         item.classList.remove("hide-item");
         item.classList.add("show-item");
      } else {
         if (
            item.classList.contains(`sex-${idParts[1]}`) &&
            item.classList.contains(`season-${idParts[2]}`)
         ) {
            item.classList.remove("hide-item");
            item.classList.add("show-item");
         }
      }
   });
   const countShowedElems = Array.from(document.querySelectorAll(".show-item"));
      const errorTitle = document.querySelector(".error-title");
   if (countShowedElems.length == 0) {
      errorTitle.classList.add("show-item");
   } else {
      errorTitle.classList.remove("show-item");
   }
}
export function filterOtherPage(event) {
   if (!event.target.classList.contains("filter-option")) {
      return false;
   }
   const id = event.target.id;
   window.location.href = "/catalog-page.html?" + id;
}

export const filterFromOtherPage = function() {
   const filter = window.location.href.split("?")[1];
   if (filter === undefined) {
      return false;
   } else {
      getFilter(filter);
   }
}

export function filterHandler(event) {
   if (!event.target.classList.contains("filter-option")) {
      return false;
   }
   const id = event.target.id;
   getFilter(id);
}

export function filterShowHideUI() {
   const filterBtn = document.getElementById("filter_btn");
   const filterSexList = document.querySelector(".sex-container");
   const filterSexBtns = document.querySelectorAll(".sex-header");
   const filterSeasonList = document.querySelector(".season-container");
   const filterSeasonBtns = document.querySelectorAll(".season-header");
   

   // Функция, которая скрывает все уже открытые элементы
   function hideAll() {
      filterSexBtns.forEach((item) => {
         const seasonContainer = item.nextElementSibling;
         if (seasonContainer.classList.contains("show-item")) {
            seasonContainer.classList.remove("show-item");
            item.classList.remove("active");
         }
      });
   }

   filterBtn.addEventListener("click", function (event) {
      if (event.target.id !== "filter_btn") {
         return false;
      }
      filterBtn.classList.toggle("active");
      filterSexList.classList.toggle("show-item");
      hideAll();
   });

   filterSexBtns.forEach((item) => {
      item.addEventListener("click", function (event) {
         const seasonContainer = event.target.nextElementSibling;
         event.target.classList.toggle("active");

         // Скрываем все уже открытые элементы
         if (!seasonContainer.classList.contains("show-item")) {
            hideAll();
            seasonContainer.classList.toggle("show-item");
         } else {
            hideAll();
         }
      });
   });
   filterSeasonBtns.forEach((item) => {
      item.addEventListener("click", function () {
         filterSeasonList.classList.remove("show-item");
         filterSexList.classList.remove("show-item");
      });
   });
   document.addEventListener("click", function (event) {
      if (
         event.target.id != "filter_btn" &&
         !event.target.classList.contains("sex-container") &&
         !event.target.classList.contains("season-container") &&
         !event.target.classList.contains("sex-header") &&
         !event.target.classList.contains("season-header")
      ) {
         filterSeasonList.classList.remove("show-item");
         filterSexList.classList.remove("show-item");
      }
   });
}

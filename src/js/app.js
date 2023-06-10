class Product {
   constructor(data) {
      this.articul = data.ARTICUL;
      this.name = data.NAME;
      this.sex = data.SEX;
      this.color = data.COLOR;
      this.season = data.SEASON;
      this.outside = data.OUTSIDE;
      this.inside = data.INSIDE;
      this.price = parseFloat(data.PRICE);
      this.sale = parseFloat(data.SALE);
      this.img = data.IMG;
      this.webp = data.WEBP;
      this.sizes = [1, 2, 3, 4, 5, 6];
      this.sexClass = function () {
         if (this.sex == "жіноче") {
            return "sex-women";
         } else if (this.sex == "комфорт") {
            return "sex-comfort";
         } else if (this.sex == "классік") {
            return "sex-classic";
         } else {
            return "";
         }
      };
      this.seasonClass = function () {
         if (this.season == "літо") {
            return "season-summer";
         } else if (this.season == "весна-осінь") {
            return "season-spring";
         } else if (this.season == "зима") {
            return "season-winter";
         } else if (this.season == "демісезон") {
            return "season-demi";
         } else {
            return "";
         }
      };
      this.sexSizes = function () {
         let sizesCode = ``;
         if (this.sex == "жіноче") {
            for (let i = 0; i < this.sizes.length; i++) {
               sizesCode += `<p class="size">${this.sizes[i] + 35}</p>`;
            }
         } else {
            for (let i = 0; i < this.sizes.length; i++) {
               sizesCode += `<p class="size">${this.sizes[i] + 39}</p>`;
            }
         }
         return sizesCode;
      };
   }
   buildProduct() {
      const isWebpDev = document.body.classList.contains("webp");
      let catalogItem = document.createElement("div");
      if (this.articul == "") {
         catalogItem.id = "emptyElement";
         return catalogItem;
      }
      catalogItem.classList.add(
         "catalog-item",
         this.sexClass(),
         this.seasonClass()
      );
      catalogItem.id = `prod_${this.articul}`;

      let itemImg = document.createElement("img");
      itemImg.className = "c-item__img";
      itemImg.src = "../img/catalog/shoes-default.png";
      if (!isWebpDev) {
         itemImg.setAttribute("data-src", this.webp);
      } else {
         itemImg.setAttribute("data-src", this.img);
      }
      let itemName = document.createElement("p");
      itemName.className = "c-item__name";
      itemName.innerText = this.name;

      let itemDescr = document.createElement("div");
      itemDescr.className = "c-item-descr";

      let itemColor = document.createElement("p");
      itemColor.className = "c-item__color";
      itemColor.innerHTML = `<span>Колір: </span>${this.color.toLowerCase()}`;

      let itemSeason = document.createElement("p");
      itemSeason.className = "c-item__season";
      itemSeason.innerHTML = `<span>Сезон: </span>${this.season.toLowerCase()}`;

      let itemOutside = document.createElement("p");
      itemOutside.className = "c-item__outside";
      itemOutside.innerHTML = `<span>Матеріал верху: </span>${this.outside.toLowerCase()}`;

      let itemInside = document.createElement("p");
      itemInside.className = "c-item__inside";
      itemInside.innerHTML = `<span>Матеріал в середині: </span>${this.inside.toLowerCase()}`;

      itemDescr.append(itemColor, itemSeason, itemOutside, itemInside);

      let itemSizePriceArt = document.createElement("div");
      itemSizePriceArt.className = "c-item-spa-block";

      let itemSize = document.createElement("div");
      itemSize.className = "c-item__size";
      itemSize.innerHTML = this.sexSizes();

      let itemPriceBlock = document.createElement("div");
      itemPriceBlock.className = "c-item-price__block";

      let itemAction = document.createElement("p");
      itemAction.classList.add(
         "c-item__action",
         getActionSale(this.price, this.sale)
      );
      itemAction.innerText = `${this.sale.toLocaleString("ru-RU")} грн`;

      let itemPriceElem = document.createElement("div");
      itemPriceElem.className = "c-item-price__elem";

      let itemPrice = document.createElement("p");
      itemPrice.classList.add(
         "c-item__price",
         getActionPrice(this.price, this.sale)
      );
      itemPrice.innerText = `${this.price.toLocaleString("ru-RU")} грн`;

      itemPriceElem.append(itemPrice);
      itemPriceBlock.append(itemAction, itemPriceElem);

      let itemArticul = document.createElement("div");
      itemArticul.className = "c-item__art";

      let itemArtText = document.createElement("div");
      itemArtText.className = "art__text";
      itemArtText.innerHTML = `<span>Артикул: </span>${this.articul}`;
      itemArticul.appendChild(itemArtText);
      itemSizePriceArt.append(itemSize, itemPriceBlock, itemArticul);

      catalogItem.append(itemImg, itemName, itemDescr, itemSizePriceArt);
      return catalogItem;
   }
}

class Catalog {
   constructor() {
      this.products = [];
   }

   render() {
      const htmlCat = document.createElement("div");
      htmlCat.className = "catalog-container";
      const errorTitle = document.createElement("div");
      errorTitle.className = "error-title";
      errorTitle.innerText =
         "Упс... Щось пішло не так. Спробуйте перезавантажити сторінку.";
      htmlCat.appendChild(errorTitle);

      this.products.forEach((product) => {
         let tmp = product.buildProduct();
         if (tmp.id != "emptyElement") {
            htmlCat.appendChild(tmp);
         }
      });
      const catalogBlock = document.getElementById("catalog");
      catalogBlock.appendChild(htmlCat);
   }

   generateProducts(data) {
      this.products = data.map((productData) => new Product(productData));
      for (let i = 0; i < this.products.length; i++) {
         if (this.products[i].articul == "") {
            this.products.pop(this.products[i]);
         }
      }
   }
}

function getActionSale(price, sale) {
   if (sale != 0 && sale < price) {
      return "action-enabled";
   } else {
      return "action-disabled";
   }
}

function getActionPrice(price, sale) {
   if (sale != 0 && sale < price) {
      return "price-inactive";
   } else {
      return "price-active";
   }
}


/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
function isWebp() {
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

function toggleBurger() {
   var headerBurger = document.querySelector(".header__burger");
   var headerMenu = document.querySelector(".header__menu");
   var headerLink = document.querySelectorAll(".header__list a");
   var headerFilter = document.querySelectorAll(".filter-option");
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

function checkTouchDevice() {
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

function assignIndexFotoPath() {
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
function qrOnTouchDevice() {
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
const catalogPage = new Catalog();
function renderCatalog() {
   Papa.parse("../files/price-var.csv", {
      download: true,
      header: true,
      skipEmptyLines: "greedy",
      complete: function (results) {
         catalogPage.generateProducts(results.data);
         catalogPage.render();
      },
   });
}
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
function filterOtherPage(event) {
   if (!event.target.classList.contains("filter-option")) {
      return false;
   }
   const id = event.target.id;
   window.location.href = "/catalog-page.html?" + id;
}

const filterFromOtherPage = function () {
   const filter = window.location.href.split("?")[1];
   if (filter === undefined) {
      return false;
   } else {
      getFilter(filter);
   }
};

function filterHandler(event) {
   if (!event.target.classList.contains("filter-option")) {
      return false;
   }
   const id = event.target.id;
   getFilter(id);
}

function filterShowHideUI() {
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
function preloadByScroll() {
   const catImages = Array.from(document.getElementsByClassName("c-item__img"));
   for (let i = 0; i < catImages.length; i++){
      if (i < 12) {
         catImages[i].src = catImages[i].getAttribute("data-src");
         catImages[i].removeAttribute("data-src");
      } else {
         let imgItem = catImages[i];
         window.addEventListener("scroll", () => {
            let rect = imgItem.getBoundingClientRect();
            let distFromTop = rect.top;
            if (distFromTop < 100 && imgItem.getAttribute("data-src")) {
               imgItem.src = imgItem.getAttribute("data-src");
               imgItem.removeAttribute("data-src");
            }
         });
      }
   }   
}


window.addEventListener("load", () => {
   const spinner = document.getElementById("spinner");
   spinner.style.display = "none";
});
isWebp();

checkTouchDevice();
qrOnTouchDevice();

toggleBurger();

filterShowHideUI();

const headerFilter = document.querySelector(".sex-container");

const currentPageUrl = window.location.href;
if (currentPageUrl.includes("catalog")) {
   // Сторінка КАТАЛОГ
   renderCatalog();
   setTimeout(filterFromOtherPage, 500);
   headerFilter.addEventListener("click", filterHandler);
   preloadByScroll();
} else {
   // ГОЛОВНА
   assignIndexFotoPath();
   headerFilter.addEventListener("click", filterOtherPage);
}


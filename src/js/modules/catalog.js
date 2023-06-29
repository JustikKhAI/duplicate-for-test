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
         catalogItem.className = "emptyElement";
         return catalogItem;
      }
      (catalogItem.className = "catalog-item");
         catalogItem.classList.add(
            `${this.sexClass()}`,
            `${this.seasonClass()}`
         );
      catalogItem.id = `prod_${this.articul}`;

      let itemImg = document.createElement("img");
      itemImg.className = "c-item__img";
      if (isWebpDev) {
         itemImg.src = this.webp;
      } else {
         itemImg.src = this.img;
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

export class Catalog {
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

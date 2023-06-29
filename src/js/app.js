import * as justikFunctions from "./modules/functions.js";
window.addEventListener("load", () => {
   const spinner = document.getElementById("spinner");
   spinner.style.display = "none";
});
justikFunctions.isWebp();

justikFunctions.checkTouchDevice();
justikFunctions.qrOnTouchDevice();

justikFunctions.toggleBurger();

justikFunctions.filterShowHideUI();

const headerFilter = document.querySelector(".sex-container");

const currentPageUrl = window.location.href;
if (currentPageUrl.includes("catalog")) {
   // Сторінка КАТАЛОГ
   justikFunctions.renderCatalog();
   setTimeout(justikFunctions.filterFromOtherPage,500);
   headerFilter.addEventListener("click", justikFunctions.filterHandler);
} else {
   // ГОЛОВНА
   justikFunctions.assignIndexFotoPath();
   headerFilter.addEventListener("click", justikFunctions.filterOtherPage);
}

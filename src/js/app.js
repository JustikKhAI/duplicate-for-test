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

const activeFilter = document.querySelector(".sex-container");

const currentPageUrl = window.location.href;
if (currentPageUrl.includes("catalog")) {
   // Сторінка КАТАЛОГ
   justikFunctions.renderCatalog();

   setTimeout(justikFunctions.filterFromOtherPage, 500);

   activeFilter.addEventListener("click", justikFunctions.filterHandler);

} else {
   // ГОЛОВНА
   justikFunctions.assignIndexFotoPath();
   activeFilter.addEventListener("click", justikFunctions.filterOtherPage);
}






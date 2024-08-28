import { readingController } from "./readingController.js";

const $ = (elem) => document.getElementById(elem);

const $nextPage = $("nextPage");
const $previousPage = $("previousPage");

$nextPage.addEventListener("click", () => {
  readingController.goNextPage();
});
$previousPage.addEventListener("click", () => {
  readingController.goPreviousPage();
});

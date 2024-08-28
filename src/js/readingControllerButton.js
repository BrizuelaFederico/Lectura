import { readingController } from "./readingController.js";

const $ = (elem) => document.getElementById(elem);

const $nextPage = $("nextPage");
const $previousPage = $("previousPage");
const $nextRow = $("nextRow");
const $previousRow = $("previousRow");

$nextPage.addEventListener("click", () => {
  readingController.goNextPage();
});
$previousPage.addEventListener("click", () => {
  readingController.goPreviousPage();
});
$nextRow.addEventListener("click", () => {
  readingController.goNextRow();
});
$previousRow.addEventListener("click", () => {
  readingController.goPreviousRow();
});

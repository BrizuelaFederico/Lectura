import { readingController } from "./readingController.js";

const $ = (elem) => document.getElementById(elem);

const $nextPage = $("nextPage");
const $previousPage = $("previousPage");
const $nextRow = $("nextRow");
const $previousRow = $("previousRow");
const $nextSet = $("nextSet");
const $previousSet = $("previousSet");

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
$nextSet.addEventListener("click", () => {
  readingController.goNextSet();
});
$previousSet.addEventListener("click", () => {
  readingController.goPreviousSet();
});

import { readingController } from "./readingController.js";
import { reading } from "./reading.js";

const $ = (elem) => document.getElementById(elem);

const $nextPage = $("nextPage");
const $previousPage = $("previousPage");
const $nextRow = $("nextRow");
const $previousRow = $("previousRow");
const $nextSet = $("nextSet");
const $previousSet = $("previousSet");
const $openSetPageDialog = $("openSetPageDialog");
const $setPageDialog = $("setPageDialog");
const $setPageDialogButton = $("setPageDialogButton");

globalThis.window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      $previousPage.click();
      break;
    case "ArrowRight":
      $nextPage.click();
      break;
  }
});

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

$openSetPageDialog.addEventListener("click", () => {
  const totalPage = reading.getPageSize();
  $setPageDialog.querySelector("b").innerHTML = totalPage;
  $setPageDialog.showModal();
});

$setPageDialogButton.addEventListener("click", () => {
  const totalPage = reading.getPageSize();
  let inputValue = parseInt($setPageDialog.querySelector("input").value);
  if (inputValue < 1) inputValue == 1;
  if (inputValue > totalPage) inputValue == totalPage;
  readingController.goPage(inputValue - 1);
  $setPageDialog.close();
});

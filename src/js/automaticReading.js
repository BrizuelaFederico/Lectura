import { readingController } from "./readingController.js";

const getValue = (elem) => parseInt(document.getElementById(elem).value);
let idTimeout = null;
const $screen = document.querySelector(".reading");

$screen.addEventListener("click", async () => {
  if (!idTimeout) await startAutomaticReading();
  idTimeout = null;
});

async function startAutomaticReading() {
  const initialPPM = getValue("initialPPM");
  const wordSet = getValue("wordSet");
  const changeTimeBetweenSet = getChangeTimeBetweenSet(initialPPM, wordSet);
  await new Promise((r) => (idTimeout = setTimeout(r, changeTimeBetweenSet)));
  while (readingController.goNextSet() && idTimeout) {
    await new Promise((r) => (idTimeout = setTimeout(r, changeTimeBetweenSet)));
  }
}

function getChangeTimeBetweenSet(ppm, totalWords) {
  return (60 / ppm) * totalWords * 1000; //milliseconds
}

import { readingController } from "./readingController.js";
import { reading } from "./reading.js";

const getValue = (elem) => parseInt(document.getElementById(elem).value);
let idTimeout = null;
const $screen = document.querySelector(".reading");

$screen.addEventListener("click", async () => {
  if (!idTimeout) await startAutomaticReading();
  idTimeout = null;
});

async function startAutomaticReading() {
  const initialPPM = getValue("initialPPM");
  const finalPPM = getValue("finalPPM");
  const increasePPM = getValue("increasePPM");
  const increasePagePPM = getValue("increasePagePPM");
  const wordSet = getValue("wordSet");
  let actualPPM = initialPPM;
  let newPPM = initialPPM;
  let lastPageIndexIncrease = reading.getPageIndex();
  let changeTimeBetweenSet = getChangeTimeBetweenSet(actualPPM, wordSet);
  await new Promise((r) => (idTimeout = setTimeout(r, changeTimeBetweenSet)));
  while (readingController.goNextSet() && idTimeout) {
    await new Promise((r) => (idTimeout = setTimeout(r, changeTimeBetweenSet)));

    if (lastPageIndexIncrease != reading.getPageIndex()) {
      [newPPM, lastPageIndexIncrease] = getPPMIncrease(
        actualPPM,
        finalPPM,
        increasePPM,
        reading.getPageIndex(),
        lastPageIndexIncrease,
        increasePagePPM
      );
      if (actualPPM != newPPM) {
        actualPPM = newPPM;
        changeTimeBetweenSet = getChangeTimeBetweenSet(actualPPM, wordSet);
      }
    }
  }
}

function getChangeTimeBetweenSet(ppm, totalWords) {
  return (60 / ppm) * totalWords * 1000; //milliseconds
}

function getPPMIncrease(
  actualPPM,
  maximunPPM,
  increasePPM,
  actualIndexPage,
  lastPageIndexIncrease,
  pageIncrease
) {
  if (actualPPM >= maximunPPM) return [actualPPM, lastPageIndexIncrease];
  if (actualIndexPage - lastPageIndexIncrease < pageIncrease)
    return [actualPPM, lastPageIndexIncrease];
  return [Math.min(actualPPM + increasePPM, maximunPPM), actualIndexPage];
}

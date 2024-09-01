const $actualPage = document.getElementById("actualPage");
const $totalReadingTime = document.getElementById("totalReadingTime");
const $remainingReadingTime = document.getElementById("remainingReadingTime");

const getValue = (elem) => parseInt(document.getElementById(elem).value);

function setActualPage(totalPage, actualPage) {
  $actualPage.innerText = `${actualPage}/${totalPage}`;
}

function setTotalReadingTime(totalReadingTimeInSeconds) {
  $totalReadingTime.innerText = getHHMMSS(totalReadingTimeInSeconds);
}

function setRemainingReadingTime(remainingReadingTimeInSeconds) {
  $remainingReadingTime.innerText = getHHMMSS(remainingReadingTimeInSeconds);
}

function getHHMMSS(seconds) {
  seconds = parseInt(seconds, 10);
  const hh = Math.floor(seconds / 3600);
  const totalSeconds = seconds % 3600;
  const mm = Math.floor(totalSeconds / 60);
  const ss = totalSeconds % 60;
  return `${hh}:${mm}:${ss}`;
}

function updateReadingData(totalPage, actualPageIndex) {
  const initialPPM = getValue("initialPPM");
  const pps = 60 / initialPPM;
  const rows = getValue("row");
  const sets = getValue("set");
  const wordsSet = getValue("wordSet");

  const totalReadingTime = readingTime(totalPage * rows * sets * wordsSet, pps);
  const remainingReadingTime = readingTime(
    (totalPage - actualPageIndex) * rows * sets * wordsSet,
    pps
  );

  setActualPage(totalPage, actualPageIndex + 1);
  setTotalReadingTime(totalReadingTime);
  setRemainingReadingTime(remainingReadingTime);
}
function readingTime(totalWords, pps) {
  return totalWords * pps;
}
export { updateReadingData };

const $actualPage = document.getElementById("actualPage");
const $totalReadingTime = document.getElementById("totalReadingTime");
const $remainingReadingTime = document.getElementById("remainingReadingTime");

const getValue = (elem) => parseInt(document.getElementById(elem).value);

function setActualPage(totalPage, actualPage) {
  $actualPage.textContent = `${actualPage}/${totalPage}`;
}

function setTotalReadingTime(totalReadingTimeInSeconds) {
  $totalReadingTime.textContent = getHHMMSS(totalReadingTimeInSeconds);
}

function setRemainingReadingTime(remainingReadingTimeInSeconds) {
  $remainingReadingTime.textContent = getHHMMSS(remainingReadingTimeInSeconds);
}

function getHHMMSS(seconds) {
  seconds = parseInt(seconds, 10);
  const hh = Math.floor(seconds / 3600);
  const totalSeconds = seconds % 3600;
  let mm = Math.floor(totalSeconds / 60);
  let ss = totalSeconds % 60;
  mm = mm < 10 ? `0${mm}` : mm;
  ss = ss < 10 ? `0${ss}` : ss;
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

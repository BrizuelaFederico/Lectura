import { readingController } from "./init.js";

const $ = (elem) => document.getElementById(elem);

let initialPPM = null;
let finalPPM = null;
let increasePPM = null;
let increasePagePPM = null;
let row = null;
let set = null;
let wordSet = null;
let lineBreakTab = null;

$("readingSettingsButton").addEventListener("click", (event) => {
  backupSettingsValue();
  $("readingSetting").showModal();
});

function backupSettingsValue() {
  initialPPM = parseInt($("initialPPM").value);
  finalPPM = parseInt($("finalPPM").value);
  increasePPM = parseInt($("increasePPM").value);
  increasePagePPM = parseInt($("increasePagePPM").value);
  row = parseInt($("row").value);
  set = parseInt($("set").value);
  wordSet = parseInt($("wordSet").value);
  lineBreakTab = $("lineBreakTab").checked;
}

$("readingSettingsCancelButton").addEventListener("click", (event) => {
  restoreBackup();
  $("readingSetting").close();
});

function restoreBackup() {
  $("initialPPM").value = initialPPM;
  $("finalPPM").value = finalPPM;
  $("increasePPM").value = increasePPM;
  $("increasePagePPM").value = increasePagePPM;
  $("row").value = row;
  $("set").value = set;
  $("wordSet").value = wordSet;
  $("lineBreakTab").checked = lineBreakTab;
}

$("readingSettingsApplyButton").addEventListener("click", (event) => {
  readingController.updateReading();
  $("readingSetting").close();
});

$("readingSetting").addEventListener("cancel", (event) => {
  restoreBackup();
});

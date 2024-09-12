import { defaultSetting } from "./defaultSetting.js";
import { db, TABLE_NAMES } from "./indexedDB.js";
import { getSettingsValues } from "./setting.js";
const $ = (elem) => document.getElementById(elem);
const changeEvent = new Event("change");

const $saveSettingDialog = $("saveSettingDialog");
const $showSaveSettingDialog = $("showSaveSettingDialog");
const $saveSettingApplyButton = $("saveSettingApplyButton");
const $saveSettingCancelButton = $("saveSettingCancelButton");

function loadDefaultSetting() {
  for (let [key, value] of Object.entries(defaultSetting)) {
    let $input = document.getElementById(key);
    if ($input.getAttribute("type") == "checkbox")
      $input.checked = value == "true";
    else $input.value = value;
    $input.dispatchEvent(changeEvent);
  }
}

$showSaveSettingDialog.addEventListener("click", (event) => {
  $saveSettingDialog.showModal();
});

$saveSettingApplyButton.addEventListener("click", (event) => {
  const settingsValues = getSettingsValues();
  const data = {
    id: $("inputSaveSetting").value,
    setting: settingsValues,
  };
  const result = db.add(TABLE_NAMES.SETTING, data);
  result
    .then((resolve) => {
      oncompleteFunction(resolve);
    })
    .catch((reject) => {
      onerrorFunction(reject);
    });

  $saveSettingDialog.close();
});

$saveSettingCancelButton.addEventListener("click", (event) => {
  $saveSettingDialog.close();
});

function oncompleteFunction(message) {
  //TODO
  console.log(message);
}

function onerrorFunction(message) {
  //TODO
  console.log(message);
}

loadDefaultSetting(); //TODO load db, if its empty, load default setting

export { loadDefaultSetting };

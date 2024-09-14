import { defaultSetting } from "./defaultSetting.js";
import { db, TABLE_NAMES } from "./indexedDB.js";
import { getSettingsValues } from "./setting.js";
import { readingController } from "./readingController.js";
const $ = (elem) => document.getElementById(elem);
const changeEvent = new Event("change");

const $saveSettingDialog = $("saveSettingDialog");
const $showSaveSettingDialog = $("showSaveSettingDialog");
const $saveSettingApplyButton = $("saveSettingApplyButton");
const $saveSettingCancelButton = $("saveSettingCancelButton");

const $loadSettingDialog = $("loadSettingDialog");
const $showLoadSettingDialog = $("showLoadSettingDialog");
const $loadSettingApplyButton = $("loadSettingApplyButton");
const $loadSettingCancelButton = $("loadSettingCancelButton");
const $settingDBselect = $("settingDBselect");

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

$showLoadSettingDialog.addEventListener("click", (event) => {
  const result = db.getAll(TABLE_NAMES.SETTING);
  result
    .then((resolve) => {
      showLoadSettingDialog(resolve);
    })
    .catch((reject) => {
      onerrorFunction(reject);
    });
});

function showLoadSettingDialog(dbResult) {
  let innerHTML = "<option>Default</option>";
  Object.values(dbResult).forEach((value) => {
    innerHTML = innerHTML.concat(`<option>${value.id}</option>`);
  });
  $settingDBselect.innerHTML = innerHTML;
  $loadSettingDialog.showModal();
}

$loadSettingCancelButton.addEventListener("click", (event) => {
  $loadSettingDialog.close();
});

$loadSettingApplyButton.addEventListener("click", (event) => {
  const selectedSetting = $settingDBselect.selectedOptions[0].label;
  const result = db.get(TABLE_NAMES.SETTING, selectedSetting);
  result
    .then((resolve) => {
      if (!resolve || resolve == "Default") {
        loadSetting(defaultSetting);
      } else {
        loadSetting(resolve.setting);
      }
      readingController.updateReading();
    })
    .catch((reject) => {
      onerrorFunction(reject);
    });
  $loadSettingDialog.close();
});

function oncompleteFunction(message) {
  //TODO
  console.log(message);
}

function onerrorFunction(message) {
  //TODO
  console.log(message);
}

function loadSetting(setting) {
  for (let [key, value] of Object.entries(setting)) {
    let $input = document.getElementById(key);
    if ($input.getAttribute("type") == "checkbox")
      $input.checked = value == "true";
    else $input.value = value;
    $input.dispatchEvent(changeEvent);
  }
}

loadSetting(defaultSetting); //TODO load db, if its empty, load default setting

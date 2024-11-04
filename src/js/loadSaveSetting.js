import { defaultSetting } from "./defaultSetting.js";
import { db, TABLE_NAMES, readingController } from "./init.js";
import { getSettingsValues } from "./setting.js";
import { showSuccessAlert, showErrorAlert } from "./alert.js";
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

const $deleteSettingDialog = $("deleteSettingDialog");
const $showDeleteSettingDialog = $("showDeleteSettingDialog");
const $deleteSettingApplyButton = $("deleteSettingApplyButton");
const $deleteSettingCancelButton = $("deleteSettingCancelButton");
const $deleteSettingDBselect = $("deleteSettingDBselect");

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
      oncompleteFunction(
        `Se guardó correctamente la configuración: "${resolve.id}"`
      );
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
  generateOptions($settingDBselect, "Default", dbResult);
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
      if (!resolve || resolve.id == "Default") {
        loadSetting(defaultSetting);
        oncompleteFunction(`Se cargó la configuración por defecto`);
      } else {
        loadSetting(resolve.setting);
        oncompleteFunction(`Se cargó correctamente: "${resolve.id}"`);
      }
      readingController.updateReading();
    })
    .catch((reject) => {
      onerrorFunction(reject);
    });
  $loadSettingDialog.close();
});

$showDeleteSettingDialog.addEventListener("click", (event) => {
  const result = db.getAll(TABLE_NAMES.SETTING);
  result
    .then((resolve) => {
      showDeleteSettingDialog(resolve);
    })
    .catch((reject) => {
      onerrorFunction(reject);
    });
});

function showDeleteSettingDialog(dbResult) {
  generateOptions($deleteSettingDBselect, "-", dbResult);
  $deleteSettingDialog.showModal();
}

$deleteSettingCancelButton.addEventListener("click", (event) => {
  $deleteSettingDialog.close();
});

$deleteSettingApplyButton.addEventListener("click", (event) => {
  const selectedSetting = $deleteSettingDBselect.selectedOptions[0].label;
  if (selectedSetting == "-") {
    $deleteSettingDialog.close();
    return;
  }

  const result = db.delete(TABLE_NAMES.SETTING, selectedSetting);
  result
    .then((resolve) => {
      oncompleteFunction(
        `Se eliminó correctamente la configuración: "${selectedSetting}"`
      );
    })
    .catch((reject) => {
      onerrorFunction(reject);
    });
  $deleteSettingDialog.close();
});

function generateOptions($element, firstOptionText, dbResult) {
  while ($element.firstChild) {
    $element.removeChild($element.firstChild);
  }

  let $option = document.createElement("option");
  $option.textContent = firstOptionText;
  $element.appendChild($option);

  Object.values(dbResult).forEach((value) => {
    $option = document.createElement("option");
    $option.textContent = value.id;
    $element.appendChild($option);
  });
}

function oncompleteFunction(message) {
  showSuccessAlert(message);
  console.log(message);
}

function onerrorFunction(message) {
  showErrorAlert(message);
  console.log(message);
}

function loadSetting(setting) {
  for (let [key, value] of Object.entries(setting)) {
    let $input = document.getElementById(key);
    if ($input.getAttribute("type") == "checkbox")
      $input.checked = value.toString() == "true";
    else $input.value = value;
    $input.dispatchEvent(changeEvent);
  }
}

export { loadSetting };

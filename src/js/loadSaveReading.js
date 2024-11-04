import { reading, readingController, db, TABLE_NAMES } from "./init.js";
import { getSettingsValues } from "./setting.js";
import { loadSetting } from "./loadSaveSetting.js";
import { showSuccessAlert, showErrorAlert } from "./alert.js";

const $ = (elem) => document.getElementById(elem);
const $loadReadingDialog = $("loadReadingDialog");
const $showLoadReadingDialog = $("showLoadReadingDialog");
const $loadReadingDialogApplyButton = $("loadReadingDialogApplyButton");
const $loadReadingDialogCancelButton = $("loadReadingDialogCancelButton");

const $saveReadingDialog = $("saveReadingDialog");
const $showSaveReadingDialog = $("showSaveReadingDialog");
const $saveReadingDialogApplyButton = $("saveReadingDialogApplyButton");
const $saveReadingDialogCancelButton = $("saveReadingDialogCancelButton");

const $deleteReadingDialog = $("deleteReadingDialog");
const $showDeleteReadingDialog = $("showDeleteReadingDialog");
const $deleteReadingDBselect = $("deleteReadingDBselect");
const $deleteReadingDialogApplyButton = $("deleteReadingDialogApplyButton");
const $deleteReadingDialogCancelButton = $("deleteReadingDialogCancelButton");

$showLoadReadingDialog.addEventListener("click", (event) => {
  const result = db.get(TABLE_NAMES.READING, reading.getReadingName());
  result
    .then((resolve) => {
      showLoadReadingDialog(resolve);
    })
    .catch((reject) => {
      alertOnErrorFunction(reject);
    });
});

function showLoadReadingDialog(dbResult) {
  let textContent = "";
  if (dbResult) {
    if ($loadReadingDialogApplyButton.hasAttribute("hidden")) {
      $loadReadingDialogApplyButton.removeAttribute("hidden");
    }
    textContent = `¿Cargar el último guardado (ubicación y estilos) del archivo "${dbResult.id}"?`;
    $loadReadingDialog.querySelector("p").textContent = textContent;
  } else {
    $loadReadingDialogApplyButton.setAttribute("hidden", true);
    textContent = `No hay un guardado de la lectura actual`;
    $loadReadingDialog.querySelector("p").textContent = textContent;
  }
  $loadReadingDialog.showModal();
}

$loadReadingDialogApplyButton.addEventListener("click", (event) => {
  loadReading(reading.getReadingName(), loadAlert, alertOnErrorFunction);
  $loadReadingDialog.close();
});

function loadReading(readingName, onCompleteFunction, onErrorFunction) {
  const result = db.get(TABLE_NAMES.READING, readingName);
  result
    .then((resolve) => {
      loadSetting(resolve.setting);
      readingController.updateReading();
      readingController.goPage(resolve.pageIndex);
      onCompleteFunction(resolve);
    })
    .catch((reject) => {
      onErrorFunction(reject);
    });
}

$loadReadingDialogCancelButton.addEventListener("click", (event) => {
  $loadReadingDialog.close();
});

$showSaveReadingDialog.addEventListener("click", (event) => {
  $saveReadingDialog.showModal();
});

$saveReadingDialogApplyButton.addEventListener("click", (event) => {
  const data = {
    id: reading.getReadingName(),
    pageIndex: reading.getPageIndex(),
    setting: getSettingsValues(),
  };
  const result = db.add(TABLE_NAMES.READING, data);
  result
    .then((resolve) => {
      saveAlert(resolve);
    })
    .catch((reject) => {
      alertOnErrorFunction(reject);
    });
  $saveReadingDialog.close();
});

$saveReadingDialogCancelButton.addEventListener("click", (event) => {
  $saveReadingDialog.close();
});

$showDeleteReadingDialog.addEventListener("click", (event) => {
  const result = db.getAll(TABLE_NAMES.READING);
  result
    .then((resolve) => {
      showDeleteReadingDialog(resolve);
    })
    .catch((reject) => {
      alertOnErrorFunction(reject);
    });
});

function showDeleteReadingDialog(dbResult) {
  while ($deleteReadingDBselect.firstChild) {
    $deleteReadingDBselect.removeChild($deleteReadingDBselect.firstChild);
  }

  let $option = document.createElement("option");
  $option.textContent = "-";
  $deleteReadingDBselect.appendChild($option);

  Object.values(dbResult).forEach((value) => {
    $option = document.createElement("option");
    $option.textContent = value.id;
    $deleteReadingDBselect.appendChild($option);
  });

  $deleteReadingDialog.showModal();
}

$deleteReadingDialogApplyButton.addEventListener("click", (event) => {
  const selectedSetting = $deleteReadingDBselect.selectedOptions[0].label;
  if (selectedSetting == "-") {
    $deleteReadingDialog.close();
    return;
  }

  const result = db.delete(TABLE_NAMES.READING, selectedSetting);
  result
    .then((resolve) => {
      deleteAlert(selectedSetting);
    })
    .catch((reject) => {
      alertOnErrorFunction(reject);
    });
  $deleteReadingDialog.close();
});

$deleteReadingDialogCancelButton.addEventListener("click", (event) => {
  $deleteReadingDialog.close();
});

function loadAlert(resolve) {
  const message = `Se pudo cargar correctamente la configurarión para la lectura "${resolve.id}"`;
  alertOnCompleteFunction(message);
}

function saveAlert(resolve) {
  const message = `Se pudo guardar correctamente la configuración para la lectura "${resolve.id}"`;
  alertOnCompleteFunction(message);
}

function deleteAlert(selectedSetting) {
  const message = `Se pudo eliminar correctamente la configuración la lectura "${selectedSetting}"`;
  alertOnCompleteFunction(message);
}

function alertOnCompleteFunction(message) {
  showSuccessAlert(message);
  console.log(message);
}

function alertOnErrorFunction(reject) {
  showErrorAlert(reject);
  console.log(reject);
}

export { loadReading };

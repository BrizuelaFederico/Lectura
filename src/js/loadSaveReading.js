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
      onerrorFunction(reject);
    });
});

function showLoadReadingDialog(dbResult) {
  let innerHTML = "";
  if (dbResult) {
    if ($loadReadingDialogApplyButton.hasAttribute("hidden")) {
      $loadReadingDialogApplyButton.removeAttribute("hidden");
    }
    innerHTML = `¿Cargar el último guardado (ubicación y estilos) del archivo "${dbResult.id}"?`;
    $loadReadingDialog.querySelector("p").innerHTML = innerHTML;
  } else {
    $loadReadingDialogApplyButton.setAttribute("hidden", true);
    innerHTML = `No hay un guardado de la lectura actual`;
    $loadReadingDialog.querySelector("p").innerHTML = innerHTML;
  }
  $loadReadingDialog.showModal();
}

$loadReadingDialogApplyButton.addEventListener("click", (event) => {
  const result = db.get(TABLE_NAMES.READING, reading.getReadingName());
  result
    .then((resolve) => {
      loadSetting(resolve.setting);
      readingController.updateReading();
      readingController.goPage(resolve.pageIndex);
      oncompleteFunction(
        `Se pudo cargar correctamente la configurarión para la lectura "${resolve.id}"`
      );
    })
    .catch((reject) => {
      onerrorFunction(reject);
    });
  $loadReadingDialog.close();
});

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
      oncompleteFunction(
        `Se pudo guardar correctamente la configuración para la lectura "${data.id}"`
      );
    })
    .catch((reject) => {
      onerrorFunction(reject);
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
      onerrorFunction(reject);
    });
});

function showDeleteReadingDialog(dbResult) {
  let innerHTML = "<option>_</option>";
  Object.values(dbResult).forEach((value) => {
    innerHTML = innerHTML.concat(`<option>${value.id}</option>`);
  });
  $deleteReadingDBselect.innerHTML = innerHTML;
  $deleteReadingDialog.showModal();
}

$deleteReadingDialogApplyButton.addEventListener("click", (event) => {
  const selectedSetting = $deleteReadingDBselect.selectedOptions[0].label;
  if (selectedSetting == "_") {
    $deleteReadingDialog.close();
    return;
  }

  const result = db.delete(TABLE_NAMES.READING, selectedSetting);
  result
    .then((resolve) => {
      oncompleteFunction(
        `Se pudo eliminar correctamente la configuración la lectura "${selectedSetting}"`
      );
    })
    .catch((reject) => {
      onerrorFunction(reject);
    });
  $deleteReadingDialog.close();
});

$deleteReadingDialogCancelButton.addEventListener("click", (event) => {
  $deleteReadingDialog.close();
});

function oncompleteFunction(message) {
  showSuccessAlert(message);
  console.log(message);
}

function onerrorFunction(message) {
  showErrorAlert(message);
  console.log(message);
}

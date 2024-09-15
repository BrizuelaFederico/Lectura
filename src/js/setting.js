const $cssRoot = document.querySelector(":root");
const changeEvent = new Event("change");

const SETTINGS_NAMES = {
  LETTER_SIZE: "letterSize",
  BOLD: "bold",
  TYPOGRAPHY: "typography",
  LETTER_COLOR: "letterColor",
  BACKGROUND_COLOR: "backgroundColor",
  MARGIN_ROW: "marginRow",
  MARGIN_SET: "marginSet",
  MARGIN_TOP: "marginTop",
  MARGIN_LEFT: "marginLeft",
  BORDER_TOP: "borderTop",
  BORDER_BOTTOM: "borderBottom",
  BORDER_RIGHT: "borderRight",
  BORDER_LEFT: "borderLeft",
  BORDER_STYLE: "borderStyle",
  BORDER_COLOR: "borderColor",
  BORDER_WIDTH: "borderWidth",
  INITIAL_PPM: "initialPPM",
  FINAL_PPM: "finalPPM",
  INCREASE_PPM: "increasePPM",
  INCREASE_PAGE_PPM: "increasePagePPM",
  ROW: "row",
  SET: "set",
  WORD_SET: "wordSet",
  LINE_BREAK_TAB: "lineBreakTab",
};

function cssRootEvent(id, value) {
  let aux = "";
  switch (id) {
    case SETTINGS_NAMES.LETTER_SIZE:
      $cssRoot.style.setProperty("--letterSize", value.toString() + "px");
      break;
    case SETTINGS_NAMES.BOLD:
      aux = value ? "bold" : "lighter";
      $cssRoot.style.setProperty("--bold", aux);
      break;
    case SETTINGS_NAMES.TYPOGRAPHY:
      $cssRoot.style.setProperty("--typography", value);
      break;
    case SETTINGS_NAMES.LETTER_COLOR:
      $cssRoot.style.setProperty("--letterColor", value);
      break;
    case SETTINGS_NAMES.BACKGROUND_COLOR:
      $cssRoot.style.setProperty("--backgroundColor", value);
      break;
    case SETTINGS_NAMES.MARGIN_ROW:
      $cssRoot.style.setProperty("--marginRow", value.toString() + "px");
      break;
    case SETTINGS_NAMES.MARGIN_SET:
      $cssRoot.style.setProperty("--marginSet", value.toString() + "px");
      break;
    case SETTINGS_NAMES.MARGIN_TOP:
      $cssRoot.style.setProperty("--marginTop", value.toString() + "px");
      break;
    case SETTINGS_NAMES.MARGIN_LEFT:
      $cssRoot.style.setProperty("--marginLeft", value.toString() + "px");
      break;
    case SETTINGS_NAMES.BORDER_TOP:
      aux = value
        ? document.getElementById("borderColor").value
        : "transparent";
      $cssRoot.style.setProperty("--borderTop", aux);
      break;
    case SETTINGS_NAMES.BORDER_BOTTOM:
      aux = value
        ? document.getElementById("borderColor").value
        : "transparent";
      $cssRoot.style.setProperty("--borderBottom", aux);
      break;
    case SETTINGS_NAMES.BORDER_RIGHT:
      aux = value
        ? document.getElementById("borderColor").value
        : "transparent";
      $cssRoot.style.setProperty("--borderRight", aux);
      break;
    case SETTINGS_NAMES.BORDER_LEFT:
      aux = value
        ? document.getElementById("borderColor").value
        : "transparent";
      $cssRoot.style.setProperty("--borderLeft", aux);
      break;
    case SETTINGS_NAMES.BORDER_STYLE:
      $cssRoot.style.setProperty("--borderStyle", value);
      break;
    case SETTINGS_NAMES.BORDER_COLOR:
      $cssRoot.style.setProperty("--borderColor", value);
      document.getElementById("borderTop").dispatchEvent(changeEvent);
      document.getElementById("borderBottom").dispatchEvent(changeEvent);
      document.getElementById("borderLeft").dispatchEvent(changeEvent);
      document.getElementById("borderRight").dispatchEvent(changeEvent);
      break;
    case SETTINGS_NAMES.BORDER_WIDTH:
      $cssRoot.style.setProperty("--borderWidth", value.toString() + "px");
      break;
  }
}

function addEventListener($element) {
  $element.addEventListener("change", (event) => {
    let id = event.currentTarget.getAttribute("id");
    let value = getValue(event.currentTarget);
    cssRootEvent(id, value);
  });
}

function getValue($element) {
  return $element.getAttribute("type") == "checkbox"
    ? $element.checked
    : $element.value;
}

function getSettingsValues() {
  const settingsValues = {};
  Object.values(SETTINGS_NAMES).forEach((name) => {
    settingsValues[name] = getValue(document.getElementById(name));
  });
  return settingsValues;
}

Object.values(SETTINGS_NAMES).forEach((name) => {
  addEventListener(document.getElementById(name));
});

export { SETTINGS_NAMES, getSettingsValues };

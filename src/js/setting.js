import { loadDefaultSetting } from "./loadSetting.js";

const $cssRoot = document.querySelector(":root");
const $aside = document.querySelector("aside");
const inputs = $aside.querySelectorAll("input");
const selects = $aside.querySelectorAll("select");
const changeEvent = new Event("change");

function cssRootEvent(id, value) {
  let aux = "";
  switch (id) {
    case "letterSize":
      $cssRoot.style.setProperty("--letterSize", value.toString() + "px");
      break;
    case "bold":
      aux = value ? "bold" : "lighter";
      $cssRoot.style.setProperty("--bold", aux);
      break;
    case "typography":
      $cssRoot.style.setProperty("--typography", value);
      break;
    case "letterColor":
      $cssRoot.style.setProperty("--letterColor", value);
      break;
    case "lineBreakTab":
      aux = value ? "0" : "1";
      $cssRoot.style.setProperty("--lineBreakTab", aux);
      break;
    case "backgroundColor":
      $cssRoot.style.setProperty("--backgroundColor", value);
      break;
    case "marginRow":
      $cssRoot.style.setProperty("--marginRow", value.toString() + "px");
      break;
    case "marginSet":
      $cssRoot.style.setProperty("--marginSet", value.toString() + "px");
      break;
    case "marginTop":
      $cssRoot.style.setProperty("--marginTop", value.toString() + "px");
      break;
    case "marginLeft":
      $cssRoot.style.setProperty("--marginLeft", value.toString() + "px");
      break;
    case "borderTop":
      aux = value
        ? document.getElementById("borderColor").value
        : "transparent";
      $cssRoot.style.setProperty("--borderTop", aux);
      break;
    case "borderBottom":
      aux = value
        ? document.getElementById("borderColor").value
        : "transparent";
      $cssRoot.style.setProperty("--borderBottom", aux);
      break;
    case "borderRight":
      aux = value
        ? document.getElementById("borderColor").value
        : "transparent";
      $cssRoot.style.setProperty("--borderRight", aux);
      break;
    case "borderLeft":
      aux = value
        ? document.getElementById("borderColor").value
        : "transparent";
      $cssRoot.style.setProperty("--borderLeft", aux);
      break;
    case "borderStyle":
      $cssRoot.style.setProperty("--borderStyle", value);
      break;
    case "borderColor":
      $cssRoot.style.setProperty("--borderColor", value);
      document.getElementById("borderTop").dispatchEvent(changeEvent);
      document.getElementById("borderBottom").dispatchEvent(changeEvent);
      document.getElementById("borderLeft").dispatchEvent(changeEvent);
      document.getElementById("borderRight").dispatchEvent(changeEvent);
      break;
  }
}

function addEventListener($element) {
  $element.addEventListener("change", (event) => {
    let id = event.currentTarget.getAttribute("id");
    let value =
      event.currentTarget.getAttribute("type") == "checkbox"
        ? event.currentTarget.checked
        : event.currentTarget.value;
    cssRootEvent(id, value);
  });
}

inputs.forEach(($input) => {
  addEventListener($input);
});
selects.forEach(($input) => {
  addEventListener($input);
});

loadDefaultSetting();

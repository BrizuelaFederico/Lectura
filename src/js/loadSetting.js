import { defaultSetting } from "./defaultSetting.js";

const changeEvent = new Event("change");

function loadDefaultSetting() {
  for (let [key, value] of Object.entries(defaultSetting)) {
    let $input = document.getElementById(key);
    if ($input.getAttribute("type") == "checkbox")
      $input.checked = value == "true";
    else $input.value = value;
    $input.dispatchEvent(changeEvent);
  }
}

export { loadDefaultSetting };

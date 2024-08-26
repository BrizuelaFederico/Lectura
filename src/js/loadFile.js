import { showPage } from "./readingScreen.js";
import { getReading } from "./reading.js";

const $inputFile = document.querySelector("article button input");

$inputFile.addEventListener("change", () => {
  if ($inputFile.files[0]) loadFile($inputFile.files[0]);
});

function loadFile(file) {
  const fileReader = new FileReader();
  fileReader.readAsText(file);
  fileReader.addEventListener("load", (event) => {
    const text = event.currentTarget.result;
    showPage(getReading(text)); //TODO pages
  });
}

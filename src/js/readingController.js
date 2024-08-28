import { reading } from "./reading.js";
import { readingScreen } from "./readingScreen.js";

class ReadingController {
  loadReading(fileName, text) {
    reading.newReading(fileName, text);
    const page = reading.getPage();
    readingScreen.showPage(reading.getPage());
    readingScreen.showFileName(fileName);
  }
}

const readingController = new ReadingController();

export { readingController };

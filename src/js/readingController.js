import { reading } from "./reading.js";
import { readingScreen } from "./readingScreen.js";

class ReadingController {
  loadReading(fileName, text) {
    reading.newReading(fileName, text);
    //TODO load index and all settings
    readingScreen.showPage(reading.getPage());
    readingScreen.showFileName(fileName);
  }

  goPage(indexPage) {
    reading.setIndex(indexPage, 0, 0);
    readingScreen.showPage(reading.getPage());
  }

  goNextPage() {
    if (!reading.hasNextPage()) return;
    this.goPage(reading.getIndex().page + 1);
  }

  goPreviousPage() {
    if (!reading.hasPreviousPage()) return;
    this.goPage(reading.getIndex().page - 1);
  }
}

const readingController = new ReadingController();

export { readingController };

import { reading } from "./reading.js";
import { readingScreen } from "./readingScreen.js";

class ReadingController {
  loadReading(fileName, text) {
    reading.newReading(fileName, text);
    //TODO load index and all settings
    readingScreen.showPage(reading.getPage());
    readingScreen.showFileName(fileName);
  }

  goPage(indexPage, goLastIndex = false) {
    reading.setIndex(indexPage, 0, 0);
    readingScreen.showPage(reading.getPage(), goLastIndex);
  }

  goNextPage() {
    if (!reading.hasNextPage()) return;
    this.goPage(reading.getIndex().page + 1);
  }

  goPreviousPage(goLastIndex = false) {
    if (!reading.hasPreviousPage()) return;
    this.goPage(reading.getIndex().page - 1, goLastIndex);
  }

  goNextRow() {
    if (readingScreen.hasNextRow()) {
      readingScreen.goNextRow();
    } else {
      this.goNextPage();
    }
  }

  goPreviousRow(endSet = false) {
    if (readingScreen.hasPreviousRow()) {
      readingScreen.goPreviousRow();
    } else {
      this.goPreviousPage(endSet);
    }
  }

  goNextSet() {
    if (readingScreen.hasNextSet()) {
      readingScreen.goNextSet();
    } else {
      this.goNextRow();
    }
  }
  goPreviousSet() {
    if (readingScreen.hasPreviousSet()) {
      readingScreen.goPreviousSet();
    } else {
      this.goPreviousRow(true);
    }
  }
}

const readingController = new ReadingController();

export { readingController };

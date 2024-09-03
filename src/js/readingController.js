import { reading } from "./reading.js";
import { readingScreen } from "./readingScreen.js";
import { updateReadingData } from "./readingData.js";

const getValue = (elem) => parseInt(document.getElementById(elem).value);

class ReadingController {
  loadReading(fileName, text) {
    reading.newReading(fileName, text, this.getSettings());
    //TODO load index and all settings
    readingScreen.showPage(reading.getPage());
    readingScreen.showFileName(fileName);
    updateReadingData(reading.getPageSize(), reading.getPageIndex());
  }

  getSettings() {
    return {
      rows: getValue("row"),
      sets: getValue("set"),
      wordsSet: getValue("wordSet"),
      lineBreakTab: document.getElementById("lineBreakTab").checked,
    };
  }

  updateReading() {
    reading.updateReading(this.getSettings());
    readingScreen.showPage(reading.getPage());
    updateReadingData(reading.getPageSize(), reading.getPageIndex());
  }

  goPage(pageIndex, endRow = false, endSet = false) {
    reading.setPageIndex(pageIndex);
    readingScreen.showPage(reading.getPage(), endRow, endSet);
    updateReadingData(reading.getPageSize(), reading.getPageIndex());
  }

  goNextPage() {
    if (!reading.hasNextPage()) return false;
    this.goPage(reading.getPageIndex() + 1);
    return true;
  }

  goPreviousPage(endRow = false, endSet = false) {
    if (!reading.hasPreviousPage()) return false;
    this.goPage(reading.getPageIndex() - 1, endRow, endSet);
    return true;
  }

  goNextRow() {
    if (!readingScreen.goNextRow()) return this.goNextPage();
    return true;
  }

  goPreviousRow(endSet = false) {
    if (!readingScreen.goPreviousRow())
      return this.goPreviousPage(true, endSet);
    return true;
  }

  goNextSet() {
    if (!readingScreen.goNextSet()) return this.goNextRow();
    return true;
  }
  goPreviousSet() {
    if (!readingScreen.goPreviousSet()) return this.goPreviousRow(true);
    return true;
  }
}

const readingController = new ReadingController();

export { readingController };

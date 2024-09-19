import { updateReadingData } from "./readingData.js";

const getValue = (elem) => parseInt(document.getElementById(elem).value);

class ReadingController {
  constructor(reading, readingScreen) {
    this.reading = reading;
    this.readingScreen = readingScreen;
  }

  loadReading(fileName, text) {
    this.reading.newReading(fileName, text, this.getSettings());
    //TODO load index and all settings
    this.readingScreen.showPage(this.reading.getPage());
    this.readingScreen.showFileName(fileName);
    updateReadingData(this.reading.getPageSize(), this.reading.getPageIndex());
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
    this.reading.updateReading(this.getSettings());
    this.readingScreen.showPage(this.reading.getPage());
    updateReadingData(this.reading.getPageSize(), this.reading.getPageIndex());
  }

  goPage(pageIndex, endRow = false, endSet = false) {
    this.reading.setPageIndex(pageIndex);
    this.readingScreen.showPage(this.reading.getPage(), endRow, endSet);
    updateReadingData(this.reading.getPageSize(), this.reading.getPageIndex());
  }

  goNextPage() {
    if (!this.reading.hasNextPage()) return false;
    this.goPage(this.reading.getPageIndex() + 1);
    return true;
  }

  goPreviousPage(endRow = false, endSet = false) {
    if (!this.reading.hasPreviousPage()) return false;
    this.goPage(this.reading.getPageIndex() - 1, endRow, endSet);
    return true;
  }

  goNextRow() {
    if (!this.readingScreen.goNextRow()) return this.goNextPage();
    return true;
  }

  goPreviousRow(endSet = false) {
    if (!this.readingScreen.goPreviousRow())
      return this.goPreviousPage(true, endSet);
    return true;
  }

  goNextSet() {
    if (!this.readingScreen.goNextSet()) return this.goNextRow();
    return true;
  }
  goPreviousSet() {
    if (!this.readingScreen.goPreviousSet()) return this.goPreviousRow(true);
    return true;
  }
}

export { ReadingController };

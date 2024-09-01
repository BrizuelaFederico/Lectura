import { splitText } from "./splitText.js";
import { splitToRows } from "./splitRow.js";
import { splitToSets } from "./splitSet.js";
import { splitToPages } from "./splitPage.js";

const WORD_LENGTH = 4; //1 word = 4 letter
const MARGIN_SET_LENGTH = 1.2; //This is to try to keep the same amount of words in each set.

class Reading {
  constructor() {
    this.textSplitted = [];
    this.pages = [];
    this.pageSize = 0;
    this.pageIndex = 0;
    this.fileName = "";
  }

  newReading(fileName, text, settings) {
    this.textSplitted = splitText(text);
    this.pages = this.getReading(this.textSplitted, settings);
    this.pageSize = this.pages.length;
    this.fileName = fileName;
    this.pageIndex = 0;
  }

  getReading(textSplitted, settings) {
    const numberRows = settings.rows;
    const numberSets = settings.sets;
    const numberWordSets = settings.wordsSet;
    //TODO line break and tab options
    const rows = splitToRows(
      textSplitted,
      numberSets * numberWordSets * WORD_LENGTH
    );
    const rowsWordSet = rows.map((row) =>
      splitToSets(
        row,
        numberSets,
        numberWordSets * WORD_LENGTH * MARGIN_SET_LENGTH
      )
    );
    return splitToPages(rowsWordSet, numberRows);
  }

  getPageIndex() {
    return this.pageIndex;
  }

  setPageIndex(newPageIndex) {
    if (newPageIndex < 0) {
      this.pageIndex = 0;
      return;
    }
    if (newPageIndex > this.pageSize - 1) {
      this.pageIndex = this.pageSize - 1;
      return;
    }
    this.pageIndex = newPageIndex;
  }

  getPageSize() {
    return this.pageSize;
  }

  getPage(pageNumber = this.pageIndex) {
    return this.pages[pageNumber];
  }

  hasNextPage(pageIndex = this.pageIndex) {
    return pageIndex < this.pageSize - 1;
  }

  hasPreviousPage(pageIndex = this.pageIndex) {
    return pageIndex > 0;
  }
}
const reading = new Reading();
export { reading };

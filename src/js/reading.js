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
    this.setting = null;
  }

  newReading(fileName, text, setting) {
    this.textSplitted = splitText(text);
    this.pages = this.getReading(this.textSplitted, setting);
    this.pageSize = this.pages.length;
    this.fileName = fileName;
    this.pageIndex = 0;
    this.setting = setting;
  }

  getReading(textSplitted, settings) {
    const numberRows = settings.rows;
    const numberSets = settings.sets;
    const numberWordSets = settings.wordsSet;
    const lineBreakTab = settings.lineBreakTab;
    let _textSplitted = textSplitted;
    if (!lineBreakTab)
      _textSplitted = _textSplitted.filter(
        (word) => word != "\r\n" && word != "\t"
      );

    const rows = splitToRows(
      _textSplitted,
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

  updateReading(updatedSetting) {
    if (JSON.stringify(this.setting) == JSON.stringify(updatedSetting)) return;
    const newPages = this.getReading(this.textSplitted, updatedSetting);
    const newPageIndex = this.getUpdateIndex(updatedSetting, newPages);
    this.pages = newPages;
    this.pageSize = this.pages.length;
    this.setPageIndex(newPageIndex);
    this.setting = updatedSetting;
  }

  getUpdateIndex(updatedSetting, updatedPages) {
    let newPageIndex = 0;
    let wordCounter = 0;
    let textSplittedIndex = this.getActualTextSplittedIndex();

    if (this.setting.lineBreakTab && !updatedSetting.lineBreakTab) {
      textSplittedIndex =
        this.getIndexFromWithToWithoutLineBreakTab(textSplittedIndex);
    }

    if (!this.setting.lineBreakTab && updatedSetting.lineBreakTab) {
      textSplittedIndex =
        this.getIndexFromWithoutToWithLineBreakTab(textSplittedIndex);
    }

    for (let page of updatedPages) {
      for (let row of page) {
        for (let set of row) {
          wordCounter += set.length;
        }
      }

      if (wordCounter >= textSplittedIndex) return newPageIndex;
      newPageIndex += 1;
    }
    return newPageIndex;
  }

  getActualTextSplittedIndex() {
    let wordCounter = 1;
    for (let page of this.pages.slice(0, this.pageIndex)) {
      for (let row of page) {
        for (let set of row) {
          wordCounter += set.length;
        }
      }
    }
    return wordCounter;
  }

  getIndexFromWithToWithoutLineBreakTab(textSplittedIndexWithLineBreakTab) {
    let wordCounter = 0;
    let wordWithoutLineBreakTabCounter = 0;
    for (let word of this.textSplitted) {
      wordCounter += 1;
      if (word != "\r\n" && word != "\t") wordWithoutLineBreakTabCounter += 1;
      if (wordCounter >= textSplittedIndexWithLineBreakTab)
        return wordWithoutLineBreakTabCounter;
    }
    return wordWithoutLineBreakTabCounter;
  }

  getIndexFromWithoutToWithLineBreakTab(textSplittedIndexWithoutLineBreakTab) {
    let wordCounter = 0;
    let wordWithLineBreakTabCounter = 0;
    for (let word of this.textSplitted) {
      wordWithLineBreakTabCounter += 1;
      if (word != "\r\n" && word != "\t") wordCounter += 1;
      if (wordCounter >= textSplittedIndexWithoutLineBreakTab)
        return wordWithLineBreakTabCounter;
    }
    return wordWithLineBreakTabCounter;
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

  getReadingName() {
    return this.fileName;
  }
}

const reading = new Reading();
export { reading };

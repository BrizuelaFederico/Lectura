import { splitText } from "./splitText.js";
import { splitToRows } from "./splitRow.js";
import { splitToSets } from "./splitSet.js";
import { splitToPages } from "./splitPage.js";

const WORD_LENGTH = 4; //1 word = 4 letter
const MARGIN_SET_LENGTH = 1.2; //This is to try to keep the same amount of words in each set.
const getValue = (elem) => parseInt(document.getElementById(elem).value);

class Reading {
  constructor() {
    this.pages = [];
    this.index = {
      page: 0,
      row: 0,
      set: 0,
    };
    this.fileName = "";
  }

  newReading(fileName, text) {
    this.pages = this.#getReading(text);
    this.fileName = fileName;
    this.setIndex(0, 0, 0);
  }

  setIndex(pageNumber, rowNumber, setNumber) {
    this.index.page = pageNumber;
    this.index.row = rowNumber;
    this.index.set = setNumber;
  }

  getPage(pageNumber = this.index.page) {
    return this.pages[pageNumber];
  }

  #getReading(text) {
    const numberRows = getValue("row");
    const numberSets = getValue("set");
    const numberWordSets = getValue("setWord");
    const textSplitted = splitText(text);
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
}
const reading = new Reading();
export { reading };

import { splitText } from "./splitText.js";
import { splitToRows } from "./splitRow.js";
import { splitToSets } from "./splitSet.js";

const WORD_LENGTH = 4; //1 word = 4 letter
const MARGIN_SET_LENGTH = 1.2; //This is to try to keep the same amount of words in each set.

const getValue = (elem) => parseInt(document.getElementById(elem).value);

function getReading(text) {
  //TODO split to pages
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
  return rowsWordSet;
}

export { getReading };

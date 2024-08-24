const marginRowLength = 2; //for very big words, do not leave unbalanced rows
const tabLength = 2;

function splitToRows(textSplitted, rowLength) {
  const rows = [];
  let row = "";
  for (let word of textSplitted) {
    if (word == "\r\n") {
      rows.push(row);
      row = "";
      continue;
    }

    if (row.length == 0) {
      row = row.concat(word);
      continue;
    }

    if (exceedsLength(row.length, wordLength(word), rowLength)) {
      rows.push(row);
      row = word;
      continue;
    }
    row = row.concat(" ", word);
  }
  if (row.length != 0) rows.push(row);
  return rows;
}

function exceedsLength(actualRowLength, wordLength, rowLength) {
  return actualRowLength + wordLength > rowLength + marginRowLength;
}

function wordLength(word) {
  if (word == "\t") return tabLength;
  return word.length;
}

export { splitToRows };

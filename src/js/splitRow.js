const tabLength = 4;

function splitToRows(textSplitted, rowMaxLength) {
  const rows = [];
  let row = [];
  for (let word of textSplitted) {
    if (word == "\r\n") {
      rows.push(row);
      row = [];
      continue;
    }

    if (row.length == 0) {
      row = row.concat(word);
      continue;
    }

    if (exceedsLength(rowLength(row), wordLength(word), rowMaxLength)) {
      rows.push(row);
      row = [word];
      continue;
    }
    row.push(word);
  }
  if (row.length != 0) rows.push(row);
  return rows;
}

function exceedsLength(actualRowLength, wordLength, rowMaxLength) {
  return actualRowLength + wordLength > rowMaxLength;
}

function rowLength(row) {
  let length = 0;
  for (let word of row) {
    length += wordLength(word);
  }
  return length;
}

function wordLength(word) {
  if (word == "\t") return tabLength;
  return word.length;
}

export { splitToRows };

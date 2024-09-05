const TAB_LENGTH = 4;

function splitToRows(textSplitted, rowMaxLength) {
  const rows = [];
  let row = [];
  for (let word of textSplitted) {
    if (word == "\r\n") {
      row = row.concat(word);
      rows.push(row);
      row = [];
      continue;
    }

    if (row.length == 0) {
      row = row.concat(word);
      continue;
    }

    if (exceedsLength(wordsArrayLength(row), wordLength(word), rowMaxLength)) {
      rows.push(row);
      row = [word];
      continue;
    }
    row.push(word);
  }
  if (row.length != 0) rows.push(row);
  return rows;
}

function exceedsLength(actualLength, wordLength, maxLength) {
  return actualLength + wordLength > maxLength;
}

function wordsArrayLength(array) {
  return array.reduce((accumulator, word) => accumulator + wordLength(word), 0);
}

function wordLength(word) {
  if (word == "\r\n") return 0;
  if (word == "\t") return TAB_LENGTH;
  return word.length;
}

export { splitToRows, exceedsLength, wordsArrayLength };

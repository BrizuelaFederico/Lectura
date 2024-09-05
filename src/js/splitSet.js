import { exceedsLength, wordsArrayLength } from "./splitRow.js";

function splitToSets(row, numberSets, setMaxLength) {
  const sets = [];
  let set = [];
  let count = 1;
  for (let word of row) {
    if (numberSets == count) {
      set.push(word);
      continue;
    }

    if (set.length == 0) {
      set.push(word);
      continue;
    }

    if (exceedsLength(wordsArrayLength(set), word.length, setMaxLength)) {
      sets.push(set);
      count += 1;
      set = [word];
      continue;
    }

    set.push(word);
  }
  if (set.length != 0 && set[0] != "\r\n") sets.push(set);
  if (set.length == 1 && set[0] == "\r\n") {
    if (sets.length == 0) {
      sets.push(set);
    } else {
      sets[sets.length - 1].push("\r\n");
    }
  }

  return sets;
}

export { splitToSets };

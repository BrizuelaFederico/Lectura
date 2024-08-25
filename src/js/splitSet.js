import { exceedsLength, wordsArrayLength } from "./splitRow.js";

function splitToSets(row, totalSets, setMaxLength) {
  if (row.length == 0) return [];
  const sets = [];
  let set = [];
  let count = 1;
  for (let word of row) {
    if (totalSets == count) {
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
  if (set.length != 0) sets.push(set);
  return sets;
}

export { splitToSets };

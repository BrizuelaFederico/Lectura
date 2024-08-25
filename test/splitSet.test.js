import { splitToSets } from "../src/js/splitSet.js";

test("['word1', 'word2', 'word3'], 1, 1", () => {
  const textSplitted = ["word1", "word2", "word3"];
  const result = splitToSets(textSplitted, 1, 1);
  const expected = [["word1", "word2", "word3"]];
  expect(result).toStrictEqual(expected);
});

test("['word1', 'word2', 'word3'], 2, 1", () => {
  const textSplitted = ["word1", "word2", "word3"];
  const result = splitToSets(textSplitted, 2, 1);
  const expected = [["word1"], ["word2", "word3"]];
  expect(result).toStrictEqual(expected);
});

test("['word1', 'word2', 'word3'], 3, 1", () => {
  const textSplitted = ["word1", "word2", "word3"];
  const result = splitToSets(textSplitted, 3, 1);
  const expected = [["word1"], ["word2"], ["word3"]];
  expect(result).toStrictEqual(expected);
});

test("['word1', 'word2', 'word3'], 4, 1", () => {
  const textSplitted = ["word1", "word2", "word3"];
  const result = splitToSets(textSplitted, 4, 1);
  const expected = [["word1"], ["word2"], ["word3"]];
  expect(result).toStrictEqual(expected);
});

test("[], 5, 1", () => {
  const textSplitted = [];
  const result = splitToSets(textSplitted, 5, 1);
  const expected = [];
  expect(result).toStrictEqual(expected);
});

test("['word1', 'word2', 'word3'], 2, 10", () => {
  const textSplitted = ["word1", "word2", "word3"];
  const result = splitToSets(textSplitted, 2, 10);
  const expected = [["word1", "word2"], ["word3"]];
  expect(result).toStrictEqual(expected);
});

test("['word1', 'word2', 'word3'], 3, 15", () => {
  const textSplitted = ["word1", "word2", "word3"];
  const result = splitToSets(textSplitted, 3, 15);
  const expected = [["word1", "word2", "word3"]];
  expect(result).toStrictEqual(expected);
});

test("['word1', '\\t', '\\t' 'word2', 'word3'], 3, 15", () => {
  const textSplitted = ["word1", "\t", "\t", "word2", "word3"];
  const result = splitToSets(textSplitted, 3, 15);
  const expected = [
    ["word1", "\t", "\t"],
    ["word2", "word3"],
  ];
  expect(result).toStrictEqual(expected);
});

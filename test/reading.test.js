import { reading } from "../src/js/reading.js";

test("[['word1'], ['word2'], ['word3'], ['word4'], ['word5']], rows: 2, sets: 2, words: 1, lineBreakTab: false", () => {
  const textSplitted = ["word1", "word2", "word3", "word4", "word5"];
  const settings = {
    rows: 2,
    sets: 2,
    wordsSet: 1,
    lineBreakTab: false,
  };
  const result = reading.getReading(textSplitted, settings);
  const expected = [
    [[["word1"]], [["word2"]]],
    [[["word3"]], [["word4"]]],
    [[["word5"]]],
  ];
  expect(result).toStrictEqual(expected);
});

test("[['word1'], ['word2'], ['word3'], ['word4'], ['word5']], rows: 2, sets: 2, words: 2, lineBreakTab: false", () => {
  const textSplitted = ["word1", "word2", "word3", "word4", "word5"];
  const settings = {
    rows: 2,
    sets: 2,
    wordsSet: 2,
    lineBreakTab: false,
  };
  const result = reading.getReading(textSplitted, settings);
  const expected = [
    [
      [["word1"], ["word2", "word3"]],
      [["word4"], ["word5"]],
    ],
  ];
  expect(result).toStrictEqual(expected);
});

test("[['word1'], ['word2'], ['word3'], ['word4'], ['word5']], rows: 2, sets: 3, words: 2, lineBreakTab: false", () => {
  const textSplitted = ["word1", "word2", "word3", "word4", "word5"];
  const settings = {
    rows: 2,
    sets: 3,
    wordsSet: 2,
    lineBreakTab: false,
  };
  const result = reading.getReading(textSplitted, settings);
  const expected = [[[["word1"], ["word2"], ["word3", "word4"]], [["word5"]]]];
  expect(result).toStrictEqual(expected);
});

test("[['word1'], ['word2'], ['word3'], ['word4'], ['word5']], rows: 3, sets: 3, words: 2, lineBreakTab: false", () => {
  const textSplitted = ["word1", "word2", "word3", "word4", "word5"];
  const settings = {
    rows: 3,
    sets: 3,
    wordsSet: 2,
    lineBreakTab: false,
  };
  const result = reading.getReading(textSplitted, settings);
  const expected = [[[["word1"], ["word2"], ["word3", "word4"]], [["word5"]]]];
  expect(result).toStrictEqual(expected);
});

test("[['word1'], ['word2'], ['word3'], ['word4'], ['word5']], rows: 1, sets: 3, words: 2, lineBreakTab: false", () => {
  const textSplitted = ["word1", "word2", "word3", "word4", "word5"];
  const settings = {
    rows: 1,
    sets: 3,
    wordsSet: 2,
    lineBreakTab: false,
  };
  const result = reading.getReading(textSplitted, settings);
  const expected = [
    [[["word1"], ["word2"], ["word3", "word4"]]],
    [[["word5"]]],
  ];
  expect(result).toStrictEqual(expected);
});

import { splitToPages } from "../src/js/splitPage.js";

test("[['word1'], ['word2'], ['word3']], 1", () => {
  const rows = [["word1"], ["word2"], ["word3"]];
  const result = splitToPages(rows, 1);
  const expected = [[["word1"]], [["word2"]], [["word3"]]];
  expect(result).toStrictEqual(expected);
});

test("[['word1'], ['word2'], ['word3']], 2", () => {
  const rows = [["word1"], ["word2"], ["word3"]];
  const result = splitToPages(rows, 2);
  const expected = [[["word1"], ["word2"]], [["word3"]]];
  expect(result).toStrictEqual(expected);
});

test("[['word1'], ['word2'], ['word3']], 3", () => {
  const rows = [["word1"], ["word2"], ["word3"]];
  const result = splitToPages(rows, 3);
  const expected = [[["word1"], ["word2"], ["word3"]]];
  expect(result).toStrictEqual(expected);
});

test("[['word1'], ['word2'], ['word3']], 4", () => {
  const rows = [["word1"], ["word2"], ["word3"]];
  const result = splitToPages(rows, 4);
  const expected = [[["word1"], ["word2"], ["word3"]]];
  expect(result).toStrictEqual(expected);
});

test("[], 5", () => {
  const rows = [];
  const result = splitToPages(rows, 5);
  const expected = [];
  expect(result).toStrictEqual(expected);
});

test("[], 5, != [[]]", () => {
  const rows = [];
  const result = splitToPages(rows, 5);
  const expected = [[]];
  expect(result).not.toStrictEqual(expected);
});

import { splitToRows } from "../src/js/splitRow";

test("['word1', 'word2', 'word3'], 3", () => {
  const textSplitted = ["word1", "word2", "word3"];
  const result = splitToRows(textSplitted, 3);
  const expected = [["word1"], ["word2"], ["word3"]];
  expect(result).toStrictEqual(expected);
});

test("['word1', 'word2', 'word3'], 9", () => {
  const textSplitted = ["word1", "word2", "word3"];
  const result = splitToRows(textSplitted, 9);
  const expected = [["word1"], ["word2"], ["word3"]];
  expect(result).toStrictEqual(expected);
});

test("['word1', 'word2', 'word3'], 10", () => {
  const textSplitted = ["word1", "word2", "word3"];
  const result = splitToRows(textSplitted, 10);
  const expected = [["word1", "word2"], ["word3"]];
  expect(result).toStrictEqual(expected);
});

test("['word1', '\\r\\n', 'word2', 'word3'], 10", () => {
  const textSplitted = ["word1", "\r\n", "word2", "word3"];
  const result = splitToRows(textSplitted, 10);
  const expected = [["word1"], ["word2", "word3"]];
  expect(result).toStrictEqual(expected);
});

test("['\\t', '\\t', '\\t', 'word1', 'word2'], 10", () => {
  const textSplitted = ["\t", "\t", "\t", "word1", "word2"];
  const result = splitToRows(textSplitted, 10);
  const expected = [
    ["\t", "\t", "\t"],
    ["word1", "word2"],
  ];
  expect(result).toStrictEqual(expected);
});

test("['\\r\\n', '\\r\\n', 'word1', 'word2', '\\r\\n'], 8", () => {
  const textSplitted = ["\r\n", "\r\n", "word1", "word2", "\r\n"];
  const result = splitToRows(textSplitted, 8);
  const expected = [[], [], ["word1"], ["word2"]];
  expect(result).toStrictEqual(expected);
});

test("['\\r\\n', '\\r\\n', 'word1', 'word2', '\\t', '\\r\\n', '\\r\\n'], 8", () => {
  const textSplitted = ["\r\n", "\r\n", "word1", "word2", "\t", "\r\n", "\r\n"];
  const result = splitToRows(textSplitted, 8);
  const expected = [[], [], ["word1"], ["word2", "\t"], []];
  expect(result).toStrictEqual(expected);
});

test("['\\r\\n', 'word1', '\\r\\n', 'word2', '\\t', 'word3', '\\r\\n'], 8", () => {
  const textSplitted = [
    "\r\n",
    "word1",
    "\r\n",
    "word2",
    "\t",
    "word3",
    "\r\n",
  ];
  const result = splitToRows(textSplitted, 8);
  const expected = [[], ["word1"], ["word2", "\t"], ["word3"]];
  expect(result).toStrictEqual(expected);
});

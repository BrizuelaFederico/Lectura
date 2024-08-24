import { splitToRows } from "../src/js/splitRow";

test("['word1', 'word2', 'word3'], 7", () => {
  const textSplitted = ["word1", "word2", "word3"];
  const result = splitToRows(textSplitted, 7);
  expect(result.length).toBe(3);
  expect(result[0]).toBe("word1");
  expect(result[1]).toBe("word2");
  expect(result[2]).toBe("word3");
});

test("['word1', 'word2', 'word3'], 8", () => {
  const textSplitted = ["word1", "word2", "word3"];
  const result = splitToRows(textSplitted, 8);
  expect(result.length).toBe(2);
  expect(result[0]).toBe("word1 word2");
  expect(result[1]).toBe("word3");
});

test("['word1', '\r\n', 'word2', 'word3'], 8", () => {
  const textSplitted = ["word1", "\r\n", "word2", "word3"];
  const result = splitToRows(textSplitted, 8);
  expect(result.length).toBe(2);
  expect(result[0]).toBe("word1");
  expect(result[1]).toBe("word2 word3");
});

test("['\t', '\t', '\t', 'word1', 'word2'], 8", () => {
  const textSplitted = ["\t", "\t", "\t", "word1", "word2"];
  const result = splitToRows(textSplitted, 8);
  expect(result.length).toBe(2);
  expect(result[0]).toBe("\t \t \t word1");
  expect(result[1]).toBe("word2");
});

test("['\r\n', '\r\n', 'word1', 'word2', '\r\n'], 8", () => {
  const textSplitted = ["\r\n", "\r\n", "word1", "word2", "\r\n"];
  const result = splitToRows(textSplitted, 8);
  expect(result.length).toBe(3);
  expect(result[0]).toBe("");
  expect(result[1]).toBe("");
  expect(result[2]).toBe("word1 word2");
});

test("['\r\n', '\r\n', 'word1', 'word2', '\r\n', '\r\n'], 8", () => {
  const textSplitted = ["\r\n", "\r\n", "word1", "word2", "\r\n", "\r\n"];
  const result = splitToRows(textSplitted, 8);
  expect(result.length).toBe(4);
  expect(result[0]).toBe("");
  expect(result[1]).toBe("");
  expect(result[2]).toBe("word1 word2");
  expect(result[3]).toBe("");
});

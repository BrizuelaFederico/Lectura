import { splitText } from "../src/js/splitText";

test("length = 2", () => {
  const result = splitText("word1 word2");
  expect(result.length).toBe(2);
  expect(result[0]).toBe("word1");
  expect(result[1]).toBe("word2");
});

test("length = 2 with whitespaces", () => {
  const result = splitText("    word1      word2     ");
  expect(result.length).toBe(2);
  expect(result[0]).toBe("word1");
  expect(result[1]).toBe("word2");
});

test("length = 3 with return", () => {
  const result = splitText("word1 word2\r\n");
  expect(result.length).toBe(3);
  expect(result[0]).toBe("word1");
  expect(result[1]).toBe("word2");
  expect(result[2]).toBe("\r\n");
});

test("length = 4", () => {
  const result = splitText(" word1   word2 \r\nword3");
  expect(result.length).toBe(4);
  expect(result[0]).toBe("word1");
  expect(result[1]).toBe("word2");
  expect(result[2]).toBe("\r\n");
  expect(result[3]).toBe("word3");
});

test("length = 11 with tabs", () => {
  const result = splitText(
    "   word1 \t word2\t    \r\n\r\n\t\tword3   word4 \r\n   "
  );
  expect(result.length).toBe(11);
  expect(result[0]).toBe("word1");
  expect(result[1]).toBe("\t");
  expect(result[2]).toBe("word2");
  expect(result[3]).toBe("\t");
  expect(result[4]).toBe("\r\n");
  expect(result[5]).toBe("\r\n");
  expect(result[6]).toBe("\t");
  expect(result[7]).toBe("\t");
  expect(result[8]).toBe("word3");
  expect(result[9]).toBe("word4");
  expect(result[10]).toBe("\r\n");
});

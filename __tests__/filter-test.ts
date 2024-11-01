import { FilterArgs,  parseFilter, passesFilter } from "../src/util/filter";

describe("parseFilter", () => {
  it("should parse simple input with two groups", () => {
    const input = "(term1, term2) AND (term3, term4)";
    const expected = [
      ["term1", "term2"],
      ["term3", "term4"],
    ];
    expect(parseFilter(input)).toEqual(expected);
  });

  it("should ignore spaces in input", () => {
    const input = "( term1 , term2 ) AND ( term3 , term4 )";
    const expected = [
      ["term1", "term2"],
      ["term3", "term4"],
    ];
    expect(parseFilter(input)).toEqual(expected);
  });

  it("should handle multiple spaces between tokens", () => {
    const input = "(term1,  term2)   AND    (term3,    term4)";
    const expected = [
      ["term1", "term2"],
      ["term3", "term4"],
    ];
    expect(parseFilter(input)).toEqual(expected);
  });

  it("should handle a single group without AND", () => {
    const input = "(term1, term2)";
    const expected = [["term1", "term2"]];
    expect(parseFilter(input)).toEqual(expected);
  });

  it("should return an empty array for empty input", () => {
    const input = "";
    const expected: string[][] = [];
    expect(parseFilter(input)).toEqual(expected);
  });
});

describe("passesFilter", () => {
  it("should return true when string matches includes and does not match excludes", () => {
    const args: FilterArgs = {
      includes: [["hello"]],
      excludes: ["world"],
    };
    expect(passesFilter(args, "hello there")).toBe(true);
  });

  it("should return false when string does not match any includes", () => {
    const args: FilterArgs = {
      includes: [["hello"]],
      excludes: ["world"],
    };
    expect(passesFilter(args, "goodbye there")).toBe(false);
  });

  it("should return false when string matches an exclude", () => {
    const args: FilterArgs = {
      includes: [["hello"]],
      excludes: ["there"],
    };
    expect(passesFilter(args, "hello there")).toBe(false);
  });

  it("should handle case-insensitive includes", () => {
    const args: FilterArgs = {
      includes: [["hello"]],
      excludes: [],
    };
    expect(passesFilter(args, "HELLO world")).toBe(true);
  });

  it("should handle case-sensitive includes", () => {
    const args: FilterArgs = {
      includes: [["Hello"]],
      excludes: [],
    };
    expect(passesFilter(args, "hello world")).toBe(false);
  });

  it("should return true when includes is empty", () => {
    const args: FilterArgs = {
      includes: [],
      excludes: ["world"],
    };
    expect(passesFilter(args, "any string")).toBe(true);
  });

  it("should return false when excludes contains an empty string", () => {
    const args: FilterArgs = {
      includes: [["hello"]],
      excludes: [""],
    };
    expect(passesFilter(args, "hello there")).toBe(false);
  });

  it("should return true when includes and excludes are empty", () => {
    const args: FilterArgs = {
      includes: [],
      excludes: [],
    };
    expect(passesFilter(args, "any string")).toBe(true);
  });
});

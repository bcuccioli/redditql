/**
 * Parse a filter string of the form:
 *
 *     "(term, term) AND (term, term) AND (term, term)"
 *
 * into the string[][]:
 *
 *     [["term", "term"], ["term", "term"], ["term", "term"]].
 */
export function parseFilter(input: string | undefined) {
  if (input === undefined) {
    return [];
  }

  const cleanedInput = input.replace(/\s+/g, "");

  if (cleanedInput === "") {
    return [];
  }

  const groups = cleanedInput.split("AND").map((group) => group.trim());
  const result: string[][] = [];

  for (const group of groups) {
    if (!group.startsWith("(") || !group.endsWith(")")) {
      throw new Error(`Malformed filter string: ${input}`);
    }

    const elements = group
      .slice(1, -1)
      .split(",")
      .map((e) => e.trim());
    result.push(elements);
  }

  return result;
}

export interface FilterArgs {
  includes: string[][];
  excludes: string[];
}

export function passesFilter(args: FilterArgs, str: string) {
  const matcher = (term: string) => {
    // Two cases (vim match semantics):
    // 1. term is lowercase, in which case we compare case-insensitive.
    // 2. term is not lowercase, in which case we compare originals.

    if (term.toLowerCase() === term) {
      return str.toLowerCase().includes(term);
    }
    return str.includes(term);
  };

  // If not every include sublist finds some match, return false. Note: if the
  // includes list is empty, `[].every(...)` is always true, so this will be
  // ignored.
  if (!args.includes.every((l) => l.some(matcher))) {
    return false;
  }

  // Return true iff the exclude list does not find a single match.
  return !args.excludes.some(matcher);
}

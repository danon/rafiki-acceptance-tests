import {expect} from "vitest";

export {test} from "vitest";

export function assertEquals(expected: any, actual: any): void {
  expect(actual).toStrictEqual(expected);
}

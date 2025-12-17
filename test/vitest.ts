import {expect} from "vitest";

export {test, describe, beforeEach} from "vitest";

export function assertTrue(actual: any): void {
  expect(actual).toStrictEqual(true);
}

export function assertFalse(actual: any): void {
  expect(actual).toStrictEqual(false);
}

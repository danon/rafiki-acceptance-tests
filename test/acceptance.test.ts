import {expect, test} from "vitest";

test('Example', () => {
  assertEquals('Foo', 'Foo');
});

export function assertEquals(expected: any, actual: any): void {
  expect(actual).toStrictEqual(expected);
}

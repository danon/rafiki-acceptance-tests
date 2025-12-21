import {expect, Page, test as playwrightTest} from '@playwright/test';
import {commandQueryDriver} from './dsl/driver/commandQueryDriver';
import {Dsl} from './dsl/Dsl';

export const describe = playwrightTest.describe;

export function test(title: string, test: Test): void {
  playwrightTest(title, async function ({page}): Promise<void> {
    await test(await createDsl(page));
  });
}

type Test = (dsl: Dsl) => Promise<void>;

async function createDsl(page: Page): Promise<Dsl> {
  await page.goto('http://localhost:4173/');
  await page.getByText('Loaded').waitFor({state: 'visible'});
  return new Dsl(commandQueryDriver(page));
}

export function assertEquals(expected: any, actual: any): void {
  expect(actual).toStrictEqual(expected);
}

export function assertFalse(actual: any): void {
  expect(actual).toStrictEqual(false);
}

export function assertTrue(actual: any): void {
  expect(actual).toStrictEqual(true);
}

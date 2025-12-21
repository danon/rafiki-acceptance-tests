import {expect, Page, test as playwrightTest} from '@playwright/test';
import {WebPlaywrightDriver} from './dsl/client/WebPlaywrightDriver';
import {WebDriver} from './dsl/driver/WebDriver';
import {Dsl} from './dsl/Dsl';

export const describe = playwrightTest.describe;

export function test(title: string, test: Test): void {
  playwrightTest(title, async function ({page}): Promise<void> {
    await test(await createDsl(page));
  });
}

type Test = (dsl: Dsl) => Promise<void>;

async function createDsl(page: Page): Promise<Dsl> {
  const driver = new WebPlaywrightDriver(page);
  await driver.initialize();
  return new Dsl(new WebDriver(driver));
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

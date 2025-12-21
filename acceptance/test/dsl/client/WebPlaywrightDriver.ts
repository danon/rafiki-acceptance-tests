import {Page} from '@playwright/test';

export class WebPlaywrightDriver {
  constructor(private page: Page) {}

  async initialize(): Promise<void> {
    await this.page.goto('http://localhost:4173/');
  }

  async fill(testId: string, value: string): Promise<void> {
    await this.page.getByTestId(testId).fill(value);
  }

  async click(testId: string): Promise<void> {
    await this.page.getByTestId(testId).click();
  }
}

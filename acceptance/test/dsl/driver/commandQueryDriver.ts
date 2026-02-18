import {Page} from '@playwright/test';
import {createProxy, Handler, TargetMethodName} from './createProxy';
import {Driver} from './Driver';

export function commandQueryDriver(page: Page): Driver {
  return createProxy(new CommandQueryHandler(page));
}

class CommandQueryHandler implements Handler<Driver> {
  constructor(private page: Page) {}

  async handle(methodName: TargetMethodName<Driver>, args: any[]): Promise<unknown> {
    await this.page.getByText('Reset').click();
    await this.page.getByPlaceholder("Method name as string").fill(methodName);
    await this.page.getByPlaceholder("Method arguments as JSON").fill(JSON.stringify(args));
    await this.page.getByText('Call').click();
    return JSON.parse(await this.page.getByPlaceholder("Output as JSON").inputValue());
  }
}

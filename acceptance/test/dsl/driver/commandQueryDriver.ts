import {Page} from '@playwright/test';
import {createProxy, Handler, TargetMethodName} from './createProxy';
import {Driver} from './Driver';

export function commandQueryDriver(page: Page): Driver {
  return createProxy(new CommandQueryHandler(page));
}

class CommandQueryHandler implements Handler<Driver> {
  constructor(private page: Page) {}

  async handle(methodName: TargetMethodName<Driver>, args: any[]): Promise<unknown> {
    const result = await this.page.evaluate(
      ([methodName, args]) => {
        // @ts-ignore
        return window['driverCall'](methodName, args);
      }, [methodName, args]);
    if (result.type === 'error') {
      throw new Error('Failure returned from evaluation');
    }
    return result.result;
  }
}

import {playwrightTest} from '../../playwright';
import {createProxy, Handler, TargetMethodName} from './createProxy';
import {Driver} from './Driver';

export function playwrightStepDecorate(driver: Driver): Driver {
  return createProxy(new PlaywrightStepDecorator(driver));
}

class PlaywrightStepDecorator implements Handler<Driver> {
  constructor(private driver: Driver) {}

  async handle(methodName: TargetMethodName<Driver>, args: any[]): Promise<unknown> {
    return await playwrightTest.step(methodName + ' ' + JSON.stringify(args), async () => {
      // @ts-ignore
      return await this.driver[methodName](...args);
    });
  }
}

import {functionCallerName} from '../driver/debug';

export class WebPlaywrightDriver {
  async fill(testId: string, value: string): Promise<void> {
    throw new Error('Not implemented: ' + functionCallerName());

  }

  async click(testId: string): Promise<void> {
    throw new Error('Not implemented: ' + functionCallerName());
  }
}

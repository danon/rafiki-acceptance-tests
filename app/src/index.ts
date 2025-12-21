import {InMemoryDriver} from './InMemoryDriver';

declare global {
  interface Window {
    driverCall(methodName: string, args: any[]): any;
  }
}
const inMemoryDriver = new InMemoryDriver();
window.driverCall = function (methodName: string, methodArguments: any[]): any {
  const result = {};
  // @ts-ignore
  result.methodName = methodName;
  // @ts-ignore
  result.methodArguments = methodArguments;
  try {
    // @ts-ignore
    result.result = inMemoryDriver[methodName](...methodArguments);
    // @ts-ignore
    result.type = 'success';
  } catch (error: unknown) {
    // @ts-ignore
    result.type = 'error';
    // @ts-ignore
    result.error = error.toString();
  }
  return result;
};

export {};

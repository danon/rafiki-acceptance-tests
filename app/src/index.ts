declare global {
  interface Window {
    driverCall(methodName: string, args: any[]): any;
  }
}

window.driverCall = function (methodName: string, methodArguments: any[]): any {
  console.log(methodName, methodArguments);
  return Math.random();
};

export {};

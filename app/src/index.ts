declare global {
  interface Window {
    driverCall(methodName: string, args: any[]): any;
  }
}

window.driverCall = async function (methodName: string, methodArguments: any[]): Promise<any> {
  const response = await fetch("http://localhost:5000/", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({methodName, methodArguments}),
  });
  try {
    return {type: 'success', result: await response.json()};
  } catch (error: unknown) {
    return {type: 'error', error: error};
  }
};

export {};

declare global {
  interface Window {
    driverCall(methodName: string, args: any[]): any;
  }
}
const sessionId = crypto.randomUUID();
window.driverCall = async function (methodName: string, methodArguments: any[]): Promise<any> {
  const response = await fetch("http://localhost:5000/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "X-Session-Id": sessionId,
    },
    body: JSON.stringify({methodName, methodArguments}),
  });
  try {
    return {type: 'success', result: await response.json()};
  } catch (error: unknown) {
    return {type: 'error', error: error};
  }
};

export {};

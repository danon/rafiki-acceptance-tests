import {render} from "solid-js/web";
import {createApplication} from "./Application";

const sessionId = crypto.randomUUID();

async function handler(methodName: string, methodArguments: any[]): Promise<unknown> {
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
}

const root = document.getElementById("root")!;
render(createApplication(handler), root);

export type Handler = (methodName: string, methodArguments: any[]) => Promise<unknown>;

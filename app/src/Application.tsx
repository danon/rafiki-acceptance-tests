import {createSignal, Show} from "solid-js";
import {Handler} from './index';

export function createApplication(handler: Handler) {
  return function Application() {
    const [methodName, setMethodName] = createSignal("");
    const [argsText, setArgsText] = createSignal("");
    const [output, setOutput] = createSignal<string|null>(null);

    async function call(): Promise<void> {
      const result = await handler(methodName(), JSON.parse(argsText()));
      // @ts-ignore
      setOutput(JSON.stringify(result.result.result));
    }

    function reset(): void {
      setOutput(null);
    }

    return <div>
      <input
        value={methodName()}
        onInput={(e) => setMethodName(e.target.value)}
        placeholder="Method name as string"
      />
      <input
        value={argsText()}
        onInput={(e) => setArgsText(e.target.value)}
        placeholder="Method arguments as JSON"
      />
      <button onClick={reset}>Reset</button>
      <button onClick={call}>Call</button>
      <Show when={output() !== null}>
        <textarea placeholder="Output as JSON" readOnly value={output()!}/>
      </Show>
    </div>;
  };
}

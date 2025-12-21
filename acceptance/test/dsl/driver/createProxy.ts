export interface Handler<T extends object> {
  handle(methodName: TargetMethodName<T>, args: TargetMethodArguments): HandlerReturn;
}

type TargetMethodArguments = any[];
export type TargetMethodName<T extends object> = keyof T&MethodName;
type MethodName = string|symbol;

type HandlerReturn = Promise<unknown>;
type HandlerMethod = (...args: TargetMethodArguments) => HandlerReturn;

export function createProxy<T extends object>(handler: Handler<T>): T {
  const proxy = new Proxy({}, {
      get(target: {}, property: MethodName): HandlerMethod {
        if (typeof property !== 'string') {
          throw new Error('Failed to invoke non-string property.');
        }
        return (...args: TargetMethodArguments) => {
          return handler.handle(property as TargetMethodName<T>, args);
        };
      },
    },
  );

  return proxy as T;
}

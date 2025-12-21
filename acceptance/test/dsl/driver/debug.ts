export function functionCallerName(): string {
  const error = new Error('dummy');
  return error.stack!
    .split('\n')[2]
    .replace(/^\s+at\s+(.+?)\s.+/g, '$1');
}

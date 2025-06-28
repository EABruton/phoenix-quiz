/**
 * Wraps a function in a debounce and returns the wrapped function.
 *
 * If the function is called again prior to the time the debounce period elapses,
 * cancels the original function call and replaces it with the most recent one.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function debounce<T extends (...args: any) => any>(
  func: T,
  debounceTime: number,
): T {
  let timeoutID: number | undefined;

  function wrapped(...args: Parameters<T>): undefined {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(func, debounceTime, ...args);
  }

  return wrapped as T;
}

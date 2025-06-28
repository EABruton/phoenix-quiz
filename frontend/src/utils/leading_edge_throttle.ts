/**
 * Wraps the given function and prevents it from being called until
 * after a determined period of time. Any subsequent function calls within that time are ignored.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function leadingEdgeThrottle<T extends (...args: any) => any>(
  func: T,
  waitPeriod: number,
): T {
  let canRun: boolean = true;

  function wrapped(
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): ReturnType<T> | undefined {
    if (!canRun) return undefined; // return undefined if not runnable, as per a throttled function

    canRun = false;
    setTimeout(() => {
      canRun = true;
    }, waitPeriod);

    // use 'this' from the outer function call
    return func.apply(this, args);
  }

  return wrapped as T;
}

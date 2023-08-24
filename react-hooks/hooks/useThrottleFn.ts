import throttle from "lodash/throttle";
import useLatest from "./useLatest";
import useCreation from "./useCreation";
import useUnmount from "./useUnmount";

type noop = (...args: any[]) => any;

export interface ThrottleOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}
/**
 * 用来处理节流函数的 Hooks，同样的，我们使用 Lodash 中的 节流来处理。
 * @param fn 
 * @param options 
 * @returns 
 */
const useThrottleFn = <T extends noop>(fn: T, options?: ThrottleOptions) => {
  const fnRef = useLatest(fn);

  const throttled = useCreation(
    () =>
      throttle(
        (...args: Parameters<T>): ReturnType<T> => fnRef.current(...args),
        options?.wait ?? 1000,
        options
      ),
    []
  );

  useUnmount(() => {
    throttled().cancel();
  });

  return throttled;
};

export default useThrottleFn;
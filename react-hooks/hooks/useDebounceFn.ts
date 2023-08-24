import useCreation from "./useCreation";
import useLatest from "./useLatest";
import debounce from "lodash/debounce";
import useUnmount from "./useUnmount";

type noop = (...args: any[]) => any;

export interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

/**
 * 用来处理防抖函数的 Hooks，我们主要通过 Lodash 来处理防抖。
 * @param fn 
 * @param options 
 * @returns 
 */
const useDebounceFn = <T extends noop>(fn: T, options?: DebounceOptions) => {
  const fnRef = useLatest(fn);

  const debounced = useCreation(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => fnRef.current(...args),
        options?.wait ?? 1000,
        options
      ),
    []
  );

  useUnmount(() => {
    debounced().cancel();
  });

  return debounced;
};

export default useDebounceFn;

import useCreation from "./useCreation";
import useSafeState from "./useSafeState";
import type { ThrottleOptions } from "./useThrottleFn";
import useThrottleFn from "./useThrottleFn";

/**
 * 用来处理节流值的 Hooks，跟 useDebounce 同理。
 * @param value
 * @param options
 * @returns
 */
const useThrottle = <T>(value: T, options?: ThrottleOptions) => {
  const [throttled, setThrottled] = useSafeState(value);

  const run = useThrottleFn(() => {
    setThrottled(value);
  }, options);

  useCreation(() => {
    run();
  }, [value]);

  return throttled;
};

export default useThrottle;

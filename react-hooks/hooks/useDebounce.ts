import useCreation from "./useCreation";
import useDebounceFn from "./useDebounceFn";
import type { DebounceOptions } from "./useDebounceFn";
import useSafeState from "./useSafeState";

/**
 * 用来处理防抖值的 Hooks，既然学了处理函数的防抖，那么处理值的防抖就简单多了，我们只需要利用 useDebounceFn 即可。
 */
const useDebounce = <T>(value: T, options?: DebounceOptions) => {
  const [debounced, setDebounced] = useSafeState(value);
  const run = useDebounceFn(() => {
    setDebounced(value);
  }, options);

  useCreation(() => {
    run();
  }, []);

  return debounced;
};

export default useDebounce;

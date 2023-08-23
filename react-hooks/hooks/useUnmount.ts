import { useEffect } from "react";
import useLatest from "./useLatest";

/**
 * 只在组件卸载时的 hook。
 */
const useUnmount = (fn: () => void) => {
  const fnRef = useLatest(fn);
  useEffect(() => {
    () => {
      fnRef.current();
    };
  }, []);
};

export default useUnmount;

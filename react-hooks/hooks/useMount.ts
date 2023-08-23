import { useEffect } from "react";

/**
 * 只在组件初始化执行的 hook。
 */
const useMount = (fn: () => void) => {
  useEffect(() => {
    fn?.();
  }, []);
};

export default useMount;
import { useCallback, useRef } from "react";

/**
 * 竞态锁，防止异步函数并发执行。
 * 我们在表单中或者各种按钮中，都需要与后端进行交互，
 * 这个钩子的作用是防止用户重复点击，重复调取接口（特别是订单的提交），
 * 所以这个钩子适用场景非常多，也很重要。
 */
const useLockFn = <P extends any[] = any[], V extends any = any>(
  fn: (...args: P) => Promise<V>
) => {
  const lockRef = useRef(false);

  return useCallback(
    async (...args: P) => {
      if (lockRef.current) return;
      lockRef.current = true;
      try {
        const ret = await fn(...args);
        lockRef.current = false;
        return ret;
      } catch (error) {
        lockRef.current = false;
        throw error;
      }
    },
    [fn]
  );
};

export default useLockFn;

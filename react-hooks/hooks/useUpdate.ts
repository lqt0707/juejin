import { useReducer } from "react";

/**
 *  强制组件重新渲染，最终返回一个函数。
 */
function useUpdate(): () => void {
  const [, update] = useReducer((num: number): number => num + 1, 0);
  return update;
}

export default useUpdate;

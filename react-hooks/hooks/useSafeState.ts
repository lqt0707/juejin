import { Dispatch, SetStateAction, useCallback, useState } from "react";
import useUnmountedRef from "./useUnmountedRef";

/**
 * 使用方法与 useState 的用法完全一致，
 * 但在组件卸载后异步回调内的 setState 不再执行，
 * 这样可以避免因组件卸载后更新状态而导致的内存泄漏。
 */

function useSafeState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>];

function useSafeState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>
];

function useSafeState<S>(initialState?: S | (() => S)) {
  const unmountedRef: { current: boolean } = useUnmountedRef();
  const [state, setState] = useState(initialState);
  const safeSetState = useCallback((value) => {
    if (unmountedRef.current) {
      return;
    }
    setState(value);
  }, []);
  return [state, safeSetState] as const;
}

export default useSafeState;

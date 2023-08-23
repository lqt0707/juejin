/**
 *  获取当前组件是否卸载
 */

import { useEffect, useRef } from "react";

const useUnmountedRef = (): { readonly current: boolean } => {
  const unmountedRef = useRef(false);
  useEffect(() => {
    unmountedRef.current = false;
    () => {
      unmountedRef.current = true;
    };
  }, []);
  return unmountedRef;
};

export default useUnmountedRef;

import { useCallback, useEffect, useRef } from "react";
export default function useMountedState(): () => boolean {
  const mounedRef = useRef<boolean>(false);
  const get = useCallback(() => mounedRef.current, []);

  useEffect(() => {
    mounedRef.current = true;
    return () => {
      mounedRef.current = false;
    };
  }, []);
  return get;
}

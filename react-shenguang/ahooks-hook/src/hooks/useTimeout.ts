import { useCallback, useEffect, useRef } from "react";

export const useTimeout = (fn: () => void, delay?: number) => {
  const fnRef = useRef(fn);
  useEffect(() => {
    fnRef.current = fn;
  });

  const timeRef = useRef();
  const clear = useCallback(() => {
    if (timeRef) {
      clearTimeout(timeRef.current);
    }
  }, []);

  useEffect(() => {
    timeRef.current = setTimeout(fnRef.current, delay);
    return () => clear();
  }, [delay]);
};

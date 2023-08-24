import useSafeState from "./useSafeState";
import { useEffect } from "react";
import getTarget from "./utils/getTarget";

interface Options {
  root?: any;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 *  用于观察元素是否可见区域，以及元素可见的比例
 */
const useInViewport = (target: any, options?: Options) => {
  const [inViewport, setInViewport] = useSafeState<boolean>();
  const [ratio, setRatio] = useSafeState<number>();

  useEffect(() => {
    const element = getTarget(target);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setInViewport(entry.isIntersecting);
          setRatio(entry.intersectionRatio);
        }
      },
      {
        ...options,
        root: options?.root ? getTarget(options.root) : null,
      }
    );

    observer?.observe(element);

    return () => {
      observer?.disconnect();
    };
  }, [target]);

  return [inViewport, ratio] as const;
};

export default useInViewport;

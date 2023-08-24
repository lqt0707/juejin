import { useState } from "react";
import useEventListener from "./useEventListener";

interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
  onChange?: (isHover: boolean) => void;
}
/**
 * 监听 DOM 元素是否有鼠标悬停。
 * @param target
 * @param options
 * @returns
 */
const useHover = (target, options?: Options): boolean => {
  const { onEnter, onLeave, onChange } = options || {};
  const [isHover, setIsHover] = useState<boolean>(false);
  useEventListener(
    "mouseenter",
    () => {
      onEnter?.();
      onChange?.(true);
      setIsHover(true);
    },
    target
  );

  useEventListener(
    "mouseleave",
    () => {
      onLeave?.();
      onChange?.(false);
      setIsHover(false);
    },
    target
  );

  return isHover;
};

export default useHover;

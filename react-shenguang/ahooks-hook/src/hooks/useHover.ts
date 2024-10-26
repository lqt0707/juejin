import { RefObject, useEffect, useState } from "react";
import options from "../../../../island-ssg/src/node/unocssOptions";

export interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
  onChange?: (isHovering: boolean) => void;
}
export const useHover = (
  ref: RefObject<HTMLElement>,
  options?: Options
): boolean => {
  const { onEnter, onLeave, onChange } = options || {};
  const [isEnter, setIsEnter] = useState(false);

  useEffect(() => {
    ref?.current?.addEventListener("mouseenter", () => {
      onEnter?.();
      setIsEnter(true);
      onChange?.(true);
    });

    ref?.current?.addEventListener("mouseleave", () => {
      onLeave?.();
      setIsEnter(false);
      onChange?.(false);
    });
  }, [ref]);

  return isEnter;
};

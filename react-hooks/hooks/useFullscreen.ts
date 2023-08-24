import useLatest from "./useLatest";
import useSafeState from "./useSafeState";
import BasicTarget from "./utils/BasicTarget";
import screenfull from "screenfull";
import getTarget from "./utils/getTarget";
import { useCallback } from "react";
interface Options {
  onEnter?: () => void;
  onExit?: () => void;
}
/**
 * 设置 DOM 元素是否全屏，有的时候，页面信息过多，我们希望去除无关的模块，更好展示所需的模块，就可以使用这个钩子。
 */
const useFullscreen = (target: BasicTarget, options?: Options) => {
  const { onEnter, onExit } = options || {};
  const [isFullscreen, setIsFullscreen] = useSafeState(false);
  const onExitRef = useLatest(onExit);
  const onEnterRef = useLatest(onEnter);

  const onChange = () => {
    if (screenfull.isEnabled) {
      const ele = getTarget(target);
      if (!screenfull.element) {
        onExitRef.current?.();
        setIsFullscreen(false);
        screenfull.off("change", onChange);
      } else {
        const isFullscreen = screenfull.element === ele;
        if (isFullscreen) {
          onEnterRef.current?.();
        } else {
          onExitRef.current?.();
        }
        setIsFullscreen(isFullscreen);
      }
    }
  };

  const enterFullscreen = useCallback(() => {
    const ele = getTarget(target);
    if (!ele) return;
    if (screenfull.isEnabled) {
      screenfull.request(ele);
      screenfull.on("change", onChange);
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    const ele = getTarget(target);
    if (screenfull.isEnabled && screenfull.element === ele) {
      screenfull.exit();
    }
  }, []);

  return {
    isFullscreen,
    isEnabled: screenfull.isEnabled,
    enterFullscreen,
    exitFullscreen,
  };
};
export default useFullscreen;

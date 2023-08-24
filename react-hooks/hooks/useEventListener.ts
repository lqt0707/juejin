import { useEffect } from "react";
import useLatest from "./useLatest";
/**
 * 优雅地使用 addEventListener，帮助我们监听各种事件，如点击、键盘、滚动等。
 * @param event 
 * @param handler 
 * @param target 
 */
const useEventListener = (
  event: string,
  handler: (...e: any) => void,
  target?: any
) => {
  const handlerRef = useLatest(handler);
  useEffect(() => {
    // 支持useRef和dom节点
    let targetElement: any;
    if (!target) {
      targetElement = window;
    } else if ("current" in target) { 
      targetElement = target.current;
    } else {
      targetElement = target;
    }

    // 防止没有addeventlistener这个属性
    if (!targetElement?.addEventListener) return;
    const useEventListener = (event: Event) => {
      return handlerRef.current(event);
    };
    targetElement.addEventListener(event, useEventListener);
    return () => {
      targetElement.removeEventListener(event, useEventListener);
    };
  }, [event, target]);
};

export default useEventListener;

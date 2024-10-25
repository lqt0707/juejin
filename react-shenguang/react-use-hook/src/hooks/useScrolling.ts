import { RefObject, useEffect, useState } from "react";

const useScrolling = (ref: RefObject<HTMLElement>): boolean => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    if (ref.current) {
      let scrollingTimer: number;

      // 滚动结束
      const handleScrollEnd = () => {
        setScrolling(false);
      };

      // 滚动中
      const handleScroll = () => {
        setScrolling(true);
        // 清除老的定时器，重置新的定时器
        clearTimeout(scrollingTimer);
        scrollingTimer = setTimeout(handleScrollEnd, 150);
      };

      // 监听滚动事件
      ref.current.addEventListener("scroll", handleScroll);

      return () => {
        if (ref.current) {
          // 移除滚动事件监听
          ref.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
    return () => {};
  }, [ref]);

  return scrolling;
};

export default useScrolling;

import { animated, useTransition } from "@react-spring/web";
import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import Overlay from "./Overlay";
import classNames from "classnames";

const DURATION = 300;

interface SlideInOverlayProps extends PropsWithChildren {
  isVisible: boolean;
  from?: "right" | "bottom";
  className?: string | string[];
  style?: CSSProperties;
  onEnter?: () => void;
  onExit?: () => void;
}

export const SlideInOverlay: FC<SlideInOverlayProps> = (props) => {
  const {
    isVisible,
    from = "right",
    className,
    style,
    onEnter,
    onExit,
    children,
  } = props;

  useEffect(() => {
    let timer = null;
    if (isVisible === true && onEnter != null) {
      timer = setTimeout(onEnter, DURATION);
    }
    return () => {
      if (timer != null) {
        clearTimeout(timer);
      }
    };
  }, [isVisible, onEnter]);

  const visibleRef = useRef(isVisible);

  useEffect(() => {
    let timer = null;

    if (isVisible === false && visibleRef.current === true && onExit != null) {
      timer = setTimeout(onExit, DURATION);
    }

    visibleRef.current = isVisible;

    return () => {
      if (timer != null) {
        clearTimeout(timer);
      }
    };
  }, [isVisible, onExit]);

  const x = useMemo(
    () => (from === "right" ? window.screen.width : window.screen.height),
    [from]
  );

  const transitions = useTransition(isVisible, {
    x,
    opacity: 1,
    from: {
      x,
      opacity: 1,
    },
    enter: { x: 0, opacity: 1 },
    leave: { x, opacity: 0 },
    config: { duration: DURATION },
  });

  const translate = React.useCallback(
    (x: number) => {
      switch (from) {
        case "right":
          return `translateX(${x}px)`;
        case "bottom":
          return `translateY(${x}px)`;
      }
    },
    [from]
  );

  return (
    <>
      {transitions(
        (props, isVisible) =>
          isVisible && (
            <Overlay
              as={animated.div}
              className={classNames(className)}
              style={{
                ...style,
                transform: props.x.to((x) => (x === 0 ? "none" : translate(x))),
                opacity: props.opacity,
              }}
            >
              {children}
            </Overlay>
          )
      )}
    </>
  );
};

import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { FormattedRes } from "./useCountDown";

export type TDate = dayjs.ConfigType;

export interface Options {
  leftTime?: number;
  targetDate?: TDate;
  interval?: number;
  onEnd?: () => void;
}

export interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

// 计算剩余时间

const calcLef = (target?: TDate) => {
  if (!target) return 0;
  const left = dayjs(target).valueOf() - Date.now();
  return left < 0 ? 0 : left;
};
// 格式化时间

const parseMs = (milliseconds: number): FormattedRes => {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000,
  };
};

export const useCountDown = (options: Options = {}) => {
  const { leftTime, targetDate, interval = 1000, onEnd } = options || {};
  // 计算剩余时间

  const memoLeftTime = useMemo<TDate>(() => {
    return leftTime && leftTime > 0 ? Date.now() + leftTime : undefined;
  }, [leftTime]);

  // 计算目标时间
  const target = "leftTime" in options ? memoLeftTime : targetDate;

  const [timeLeft, setTimeLeft] = useState(() => calcLef(target));

  const onEndRef = useRef(onEnd);

  useEffect(() => {
    onEndRef.current = onEnd;
  }, []);

  useEffect(() => {
    if (!target) {
      setTimeLeft(0);
      return;
    }

    setTimeLeft(calcLef(target));

    const timer = setInterval(() => {
      const targetLeft = calcLef(target);
      setTimeLeft(targetLeft);
      if (timeLeft === 0) {
        clearInterval(timer);
        onEndRef.current?.();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, interval]);

  // 格式化时间timeLeft
  const formattedRes = useMemo(() => parseMs(timeLeft), [timeLeft]);

  return [timeLeft, formattedRes] as const;
};

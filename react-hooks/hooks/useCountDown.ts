import dayjs from "dayjs";
import useCreation from "./useCreation";
import useSafeState from "./useSafeState";
import useLatest from "./useLatest";
import { useEffect } from "react";
type TDate = dayjs.ConfigType;

interface Options {
  targetDate?: TDate; // 目标日期
  interval?: number; // 变化的时间
  onEnd?: () => void; // 倒计时后触发的方法
  targetTime?: number; // 剩余时间，精确到秒
}

interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const calcRemain = (target?: TDate) => {
  if (!target) return 0;
  const remain = dayjs(target).valueOf() - Date.now();
  return remain < 0 ? 0 : remain;
};

const calcFormat = (milliseconds: number): FormattedRes => {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000,
  };
};

/**
 * 用于管理倒计时的 Hooks。
 * 在日常工作中我们时常需要倒计时的帮助，但处理时间总是比较麻烦的事，
 * 而 useCountDown 可以帮助我们解决这类困难。
 */
const useCountDown = ({
  targetTime,
  targetDate,
  interval = 1000,
  onEnd,
}: Options = {}) => {
  const target = useCreation(() => {
    if (targetTime) {
      return targetTime > 0 ? Date.now() + targetTime : undefined;
    } else {
      return targetDate;
    }
  }, [targetTime, targetDate]);

  // 处理的为毫秒
  const [remainTime, setRemainTime] = useSafeState(() => calcRemain(target));

  const onEndRef = useLatest(onEnd);

  useEffect(() => {
    if (!target) {
      return setRemainTime(0);
    }

    setRemainTime(calcRemain(target));

    const timer = setInterval(() => {
      const remain = calcRemain(target);
      setRemainTime(remain);
      if (remain === 0) {
        clearInterval(timer);
        onEndRef?.current?.();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, interval]);

  const formattedTime = useCreation(() => {
    calcFormat(remainTime);
  }, [remainTime]);

  return [remainTime, formattedTime] as const;
};
export default useCountDown;

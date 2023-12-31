import { DependencyList, useEffect, useRef } from "react";

type Effect = (
  changes?: number[], // 改变的 deps 参数
  previousDeps?: DependencyList, // 上一次的 deps 集合
  currentDeps?: DependencyList, // 本次最新的 deps 集合
  type_changes?: string[] // 返回匹配的字段名
) => void | (() => void);

// 判断改变的effect
const onChangeEffect = (deps1?: DependencyList, deps2?: DependencyList) => {
  if (deps1) {
    return deps1
      .map((_, index) =>
        !Object.is(deps1[index], deps2?.[index]) ? index : -1
      )
      .filter((v) => v !== -1);
  } else if (deps2) {
    return deps2.map((_, index) => index);
  } else return [];
};
/**
 * 可监听 useEffect 中的 deps 中的那个发生变化，用法与 useEffect 基本一致。
 */
const useTrackedEffect = (
  effect: Effect,
  deps?: DependencyList,
  type_list?: string[]
) => {
  const previousDepsRef = useRef<DependencyList>();
  useEffect(() => {
    const changes = onChangeEffect(previousDepsRef.current, deps);
    const previousDeps = previousDepsRef.current;
    previousDepsRef.current = deps;
    const type_changes = (type_list || []).filter((_, index) =>
      changes.includes(index)
    );
    return effect(changes, previousDeps, deps, type_changes);
  }, deps);
};
export default useTrackedEffect;

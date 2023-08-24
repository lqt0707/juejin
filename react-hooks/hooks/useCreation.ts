import { DependencyList, useRef } from "react";



// 比较依赖项是否相等
const depsAreSame = (
  oldDeps: DependencyList,
  deps: DependencyList
): boolean => {
  if (oldDeps === deps) {
    return true;
  }
  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], deps[i])) {
      return false;
    }
  }
  return true;
};
/**
 * 强化 useMemo 和 useRef，用法与 useMemo 一样，一般用于性能优化。
 */
const useCreation = <T>(fn: () => T, deps: DependencyList) => {
  const { current } = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false,
  });
  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = fn();
    current.initialized = true;
  }
  return current.obj as T;
};

export default useCreation;

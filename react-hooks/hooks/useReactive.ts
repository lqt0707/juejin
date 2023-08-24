import useCreation from "./useCreation";
import useLatest from "./useLatest";
import useUpdate from "./useUpdate";

const observer = <T extends Record<string, any>>(
  initialVal: T,
  cb: () => void
): T => {
  const proxy = new Proxy<T>(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);

      return typeof res === "object"
        ? observer(res, cb)
        : Reflect.get(target, key, receiver);
    },
    set(target, key, value, val) {
      const ret = Reflect.set(target, value, val);
      cb();
      return ret;
    },
  });
  return proxy;
};

/**
 * 一种具备响应式的 useState，用法与 useState 类似，但可以动态地设置值。
 */
const useReactive = <T extends Record<string, any>>(initialState: T) => {
  const ref = useLatest<T>(initialState);
  const update = useUpdate();

  const state = useCreation(() => {
    return observer(ref.current, () => {
      update();
    });
  }, []);

  return state;
};
export default useReactive;

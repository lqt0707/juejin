import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector";

type Subscribe = Parameters<typeof useSyncExternalStoreWithSelector>[0];

type GetState<T> = () => T;

type SetState<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>)
) => void;

type StoreApi<T> = {
  getState: GetState<T>;
  setState: SetState<T>;
  subscribe: Subscribe;
};

type StateCreator<T> = (setState: SetState<T>) => T;

type EqualityFn<T> = (state: T, newState: T) => boolean;

/**
 * createStore 用来创建store
 */
const createStore = <T>(createState: StateCreator<T>): StoreApi<T> => {
  let state: T; // store内部状态存储于sate上
  const listeners = new Set<(state: T) => void>();

  const setState: SetState<T> = (
    partial: T | Partial<T> | ((state: T) => T | Partial<T>)
  ) => {
    // setState是create接收函数的入参
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(state, nextState)) {
      state =
        typeof nextState !== "object" || nextState === null
          ? nextState
          : Object.assign({}, state, nextState);
      // 当状态发生变化时，依次通知组件re-render，也就是循环调用一遍listeners的所有函数
      listeners.forEach((listener) => listener());
    }
  };

  const getState = () => state;

  const subscribe = (listener: () => void) => {
    // 每次订阅时将subscribe加入到listeners，subscribe的作用是触发组件重新渲染
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const api = {
    getState,
    setState,
    subscribe,
  };
  state = createState(api.setState); // state的初始值就是createState的返回值
  return api;
};

/**
 * useStore 借助useSyncExternalStoreWithSelector完成订阅、状态选取、re-render优化，返回选择后的状态
 */
const useStore = <State, StateSlice>(
  api: StoreApi<State>,
  selector: (state: State) => StateSlice = api.getState as any,
  equalityFn?: EqualityFn<StateSlice>
) => {
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getState,
    selector,
    equalityFn
  );
  return slice;
};

export const create = <T>(createState: StateCreator<T>) => {
  const api = createStore(createState); // 创建store
  const useBoundStore = <TSlice = T>(
    selector?: (state: T) => TSlice,
    equalityFn?: EqualityFn<TSlice>
  ) => useStore<T, TSlice>(api, selector, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore as typeof useBoundStore & StoreApi<T>;
};

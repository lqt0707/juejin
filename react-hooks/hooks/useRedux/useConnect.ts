import { useContext, useEffect, useRef } from "react";
import ReduxContext from "./createRedux";
import useUpdate from "../useUpdate";
import useCreation from "../useCreation";

const useConnect = (mapStoreToState?: (data: any) => void) => {
  // 获取对应的值
  const contextValue: any = useContext(ReduxContext);
  const { getInitState, dispatch, subScribe, unSubscribe } = contextValue;

  const stateValue = useRef(getInitState(mapStoreToState));
  const update = useUpdate();

  const connectValue = useCreation(() => {
    const state = {
      oldState: stateValue.current,
      mapStoreToState,
      update: (newState: any) => {
        state.oldState = newState;
        stateValue.current = newState;
        update();
      },
    };
    return state;
  }, [contextValue]);

  useEffect(() => {
    const name = subScribe(connectValue);
    return () => {
      unSubscribe(name);
    };
  }, [connectValue]);
  return [stateValue.current, dispatch];
};

export default useConnect;

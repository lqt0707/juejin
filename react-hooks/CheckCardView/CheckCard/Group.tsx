import { useEffect, useRef } from "react";
import { useCss, useSafeState } from "../../hooks";
import {
  GroupProps,
  GroupValueType,
  SelectOptionProps,
  ValueType,
} from "./interface";
import GroupContext from "./GroupContext";
import React from "react";
import styles from "./style";

const Group: React.FC<GroupProps> = (props) => {
  const { multiple = false, style = {}, onChange, ...params } = props;

  const [stateValue, setStateValue] = useSafeState<GroupValueType>();

  useEffect(() => {
    setStateValue(params.value || params.initValue);
  }, [params.value]);

  const ref = useRef<Map<ValueType, any>>(new Map());

  // 注册
  const registerValue = (value: string) => {
    ref.current?.set(value, true);
  };

  // 卸载
  const cancelValue = (value: string) => {
    ref.current?.delete(value);
  };

  const selectOption = (option: SelectOptionProps) => {
    if (multiple) {
      let newValue: ValueType[] = [];
      const stateValues = stateValue as ValueType[];
      const flag = stateValues?.includes(option.value);
      newValue = [...(stateValues || [])];
      if (flag) {
        newValue = newValue.filter((itemValue) => itemValue !== option.value);
      } else {
        newValue.push(option.value);
      }
      setStateValue(newValue);
      onChange && onChange(newValue);
    } else {
      let newValue = stateValue;
      if (newValue === option.value) {
        newValue = undefined;
      } else {
        newValue = option.value;
      }
      setStateValue(newValue);
      onChange && onChange(newValue);
    }
  };

  return (
    <GroupContext.Provider
      value={{
        value: stateValue,
        multiple,
        loading: params.loading,
        selectOption,
        registerValue,
        cancelValue,
      }}
    >
      <div className={useCss(styles["select-card-group"])} style={style}>
        {params.children}
      </div>
    </GroupContext.Provider>
  );
};
export default Group;

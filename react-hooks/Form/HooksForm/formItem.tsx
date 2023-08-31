import React, {
  cloneElement,
  isValidElement,
  useContext,
  useEffect,
} from "react";
import useUpdate from "../../hooks/useUpdate";
import FormContext from "./useForm/FormContext";
import { updateProps } from "./useForm/interface";
import useCreation from "../../hooks/useCreation";
import { Layout } from "./FormItemCommon";

interface FormItemProps {
  label?: string;
  tootip?: string;
  [key: string]: any;
}

const FormItem = (props: FormItemProps) => {
  const { name, children } = props;
  const update = useUpdate();

  const contextValue = useContext(FormContext);
  const {
    getFieldValue,
    dispatch,
    registerField,
    unRegisterField,
    getFieldValidate,
  } = contextValue;

  const updateChange: updateProps = useCreation(() => {
    return {
      message: props?.message || `请填写${props?.label}字段`,
      required: props?.required,
      rules: props?.rules,
      updateValue: () => update(),
    };
  }, [contextValue, name]);

  useEffect(() => {
    // 注册
    name && registerField(name, updateChange);
    return () => {
      // 卸载
      name && unRegisterField(name);
    };
  }, [updateChange]);

  let childrenPro;

  if (isValidElement(children) && name) {
    childrenPro = cloneElement(children as React.ReactElement, {
      value: getFieldValue(name),
      onChange: (v: any) => {
        let payload: any = {};

        const value = v?.target?.localName === "input" ? v?.target.value : v;
        payload[name] = value;

        dispatch({
          type: "updateValue",
          name,
          value,
        });

        dispatch({
          type: "validateField",
          name,
        });
      },
      status: getFieldValidate(name)?.status === "rej" ? "error" : undefined,
    });
  } else {
    childrenPro = children;
  }

  return (
    <Layout {...props} {...getFieldValidate(name)}>
      {childrenPro}
    </Layout>
  );
};

export default FormItem;

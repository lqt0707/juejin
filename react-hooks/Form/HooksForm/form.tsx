import { forwardRef, useImperativeHandle } from "react";
import { DataProps, FormInstance } from "./useForm/interface";
import useForm from "./useForm";
import React from "react";
import FormContext from "./useForm/FormContext";

interface FormProps {
  onReset?: () => void;
  onFinish?: (data: any) => void;
  onFinishFailed?: (errorInfo: any) => void;
  initialValues?: DataProps;
  form?: FormInstance;
  [key: string]: any;
}

const Index = (props: FormProps, ref: any) => {
  const {
    form,
    children,
    onFinish = (data: any) => {},
    onReset = () => {},
    onFinishFailed = (errorInfo: any) => {},
    initialValues = {},
    ...payload
  } = props;

  const [formRef] = useForm(initialValues, form);

  const {
    registerField,
    unRegisterField,
    dispatch,
    setConfigWays,
    ...formRefInstance
  } = formRef;

  useImperativeHandle(ref, () => formRefInstance, []);

  formRef.setConfigWays({
    onFinish,
    onReset,
    onFinishFailed,
  });
  return (
    <form
      {...payload}
      onSubmit={(e) => {
        // 阻止默认事件
        e.preventDefault();
        e.stopPropagation();
        formRef.submit();
      }}
      onReset={(e) => {
        e.preventDefault();
        e.stopPropagation();
        formRef.resetFields(); /* 重置表单 */
      }}
    >
      <FormContext.Provider value={formRef}>{children}</FormContext.Provider>
    </form>
  );
};

export default forwardRef(Index);

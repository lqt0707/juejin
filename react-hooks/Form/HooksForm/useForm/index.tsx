import { useRef } from "react";
import { DataProps, FormInstance } from "./interface";
import FormStore from "./FormStore";

const useForm = (initialValue: DataProps, formInstance?: FormInstance) => {
  const formRef = useRef<FormInstance | null>();

  if (!formRef.current) {
    // 如果存在实例，则直接使用
    if (formInstance) {
      formRef.current = formInstance;
    } else {
      // 创建一个实例，帮我们获取对应的方法，而getDetail是暴漏的方法集合
      formRef.current = new FormStore(initialValue).getDetail();
    }
  }
  return [formRef.current];
};

export default useForm;

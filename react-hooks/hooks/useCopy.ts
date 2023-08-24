import { useCallback } from "react";
import useSafeState from "./useSafeState";
import writeText from "copy-to-clipboard";

type copyTextProps = string | undefined;
type CopyFn = (text: string) => void;

/**
 * 用于复制信息，在平常的开发中，为了用户操作方便，
 * 会设置复制按钮，将复制好的数据自动回传到选项的值，
 * 或是粘贴板，此时这个钩子就派上了用场。
 */
const useCopy = (): [copyTextProps, CopyFn] => {
  const [copyText, setCopyText] = useSafeState<copyTextProps>(undefined);
  const copy = useCallback((value?: string | number) => {
    if (!value) return setCopyText("");
    try {
      writeText(value.toString());
      setCopyText(value.toString());
    } catch (error) {
      setCopyText("");
    }
  }, []);
  return [copyText, copy];
};
export default useCopy;

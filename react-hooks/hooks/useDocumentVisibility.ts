import useEventListener from "./useEventListener";
import useSafeState from "./useSafeState";
import isBrowser from "./utils";

type VisibilityProps = "hidden" | "visible" | undefined;

const getVisibility = () => {
  if (!isBrowser) {
    return "visible";
  }
  return document.visibilityState;
};
/**
 * 监听页面是否可见，即当前可见元素的上下文环境。由此可以知道当前文档（即为页面）是在背后，或是不可见的隐藏的标签页。
 */
const useDocumentVisibility = (): VisibilityProps => {
  const [visibility, setVisibility] = useSafeState(() => getVisibility());

  useEventListener(
    "visibilitychange",
    () => {
      setVisibility(getVisibility());
    },
    document
  );
  return visibility;
};

export default useDocumentVisibility;

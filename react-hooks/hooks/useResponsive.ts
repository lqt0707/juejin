import useEventListener from "./useEventListener";
import useSafeState from "./useSafeState";
import isBrowser from "./utils";

type ResponsiveConfig = Record<string, number>;
type ResponsiveInfo = Record<string, boolean>;

// bootstrap 对应的四种尺寸
let responsiveConfig: ResponsiveConfig = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

let info: ResponsiveInfo = {};

export const configResponsive = (config: ResponsiveConfig) => {
  responsiveConfig = config;
};

const clac = () => {
  const width = window.innerWidth;
  const newInfo = {} as ResponsiveInfo;
  let shouldUpdate = false;
  for (const key of Object.keys(responsiveConfig)) {
    newInfo[key] = width >= responsiveConfig[key];
    // 如果发生改变，则触发更新
    if (newInfo[key] !== info[key]) {
      shouldUpdate = true;
    }
  }
  if (shouldUpdate) {
    info = newInfo;
  }
  return { shouldUpdate, info };
};
/**
 * 获取相应式信息，当屏幕尺寸发生改变时，
 * 返回的尺寸信息不同，换言之，
 * useResponsive 可以获取浏览器窗口的响应式信息。
 */
const useResponsive = () => {
  if (isBrowser) {
    clac();
  }
  const [state, setState] = useSafeState<ResponsiveInfo>(() => clac().info);
  useEventListener("resize", () => {
    const res = clac();
    if (res.shouldUpdate) setState(res.info);
  });
  return state;
};
export default useResponsive;

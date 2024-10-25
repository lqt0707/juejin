import Cookies from "js-cookie";
import { useCallback, useState } from "react";
const useCookie = (
  cookieName: string
): [
  string | null,
  (newValue: string, options?: Cookies.CookiesAttributes) => void,
  () => void
] => {
  const [value, setValue] = useState<string | null>(
    () => Cookies.get(cookieName) || null
  );

  const updateCookie = useCallback(
    (newValue: string, options?: Cookies.CookiesAttributes) => {
      Cookies.set(cookieName, newValue, options);
    },
    [cookieName]
  );

  const deleteCookie = useCallback(() => {
    Cookies.remove(cookieName);
    setValue(null);
  }, [cookieName]);

  return [value, updateCookie, deleteCookie];
};

export default useCookie;

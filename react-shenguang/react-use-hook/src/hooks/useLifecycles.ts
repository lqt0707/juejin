import { useEffect } from "react";

const useLifecycles = (mount: Function, umount?: Function) => {
  useEffect(() => {
    if (mount) {
      mount();
    }
    return () => {
      if (umount) {
        umount();
      }
    };
  }, []);
};

export default useLifecycles;

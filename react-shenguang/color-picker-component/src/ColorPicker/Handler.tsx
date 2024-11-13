import classNames from "classnames";
import { FC } from "react";

type Handlesize = "default" | "small";

interface HandlerProps {
  size?: Handlesize;
  color?: string;
}

const Handler: FC<HandlerProps> = ({ size = "default", color }) => {
  return (
    <div
      className={classNames(`color-picker-panel-palette-handler`, {
        [`color-picker-panel-palette-handler-sm`]: size === "small",
      })}
      style={{
        backgroundColor: color,
      }}
    />
  );
};

export default Handler;

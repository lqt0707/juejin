import copy from "copy-to-clipboard";
import React, { ReactElement } from "react";

interface CopyToClipboardProps {
  text: string;
  onCopy?: (text: string, result: boolean) => void;
  children: ReactElement;
  options?: {
    debug?: boolean;
    message?: string;
    format?: string;
  };
}

const CopyToClipboard = (props: CopyToClipboardProps) => {
  const { text, onCopy, children, options } = props;
  const elem = React.Children.only(children);

  function onClick(event: MouseEvent) {
    const elem = React.Children.only(children);
    const result = copy(text, options);
    if (onCopy) {
      onCopy(text, result);
    }

    if (typeof elem?.props?.onClick === "function") {
      elem.props.onClick(event);
    }
  }

  return React.cloneElement(elem, { onClick });
};

export default CopyToClipboard;
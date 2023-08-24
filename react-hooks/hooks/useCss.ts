import { create, NanoRenderer } from "nano-css";
import { addon as addonCSSOM, CSSOMAddon } from "nano-css/addon/cssom";
import { addon as addonVCSSOM, VCSSOMAddon } from "nano-css/addon/vcssom";
import { cssToTree } from "nano-css/addon/vcssom/cssToTree";
import useCreation from "./useCreation";
import { useEffect } from "react";

type NoneType = NanoRenderer & CSSOMAddon & VCSSOMAddon;
const nano = create() as NoneType;
addonCSSOM(nano);
addonVCSSOM(nano);

type CSSKey = keyof React.CSSProperties;

type CSSProps =
  | React.CSSProperties
  | {
      [key: Exclude<string, CSSKey>]: CSSProps;
    };

let counter = 0;
/**
 * 用于动态地修改 CSS，是一种具备 Css-in-JS（在 JSX/TSX 中书写 CSS）的 Hook。
 */
const useCss = (css: CSSProps): string => {
  const className = useCreation(
    () => "domesy-hooks-css-" + (counter++).toString(36),
    []
  );
  const sheet = useCreation(() => new nano.VSheet(), []);

  useEffect(() => {
    const tree = {};
    cssToTree(tree, css, "." + className, "");
    sheet.diff(tree);
    return () => {
      sheet.diff({});
    };
  }, []);
  return className;
};

export default useCss;

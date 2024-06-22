import "./styles/sass.scss";
import "./styles/less.less";
import "./styles/stylus.styl";

export function sassComponent() {
  const element = document.createElement("div");
  element.classList = ["container container-sass"];
  element.innerHTML = "Hello, Webpack && Sass";
  return element;
}

export function lessComponent() {
  const element = document.createElement("div");
  element.classList = ["container container-less"];
  element.innerHTML = "Hello, Webpack && Less";
  return element;
}

export function stylusComponent() {
  const element = document.createElement("div");
  element.classList = ["container container-stylus"];
  element.innerHTML = "Hello, Webpack && stylus";
  return element;
}

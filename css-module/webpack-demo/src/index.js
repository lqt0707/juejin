import "./styles/reset.css";
import { sassComponent, lessComponent, stylusComponent } from "./component";

function component() {
  const element = document.createElement("div");
  element.id = "app";
  const sassElement = sassComponent();
  element.appendChild(sassElement);
  const lessElement = lessComponent();
  element.appendChild(lessElement);
  const stylusElement = stylusComponent();
  element.appendChild(stylusElement);

  // 创建一个 div 用于显示，在添加上相关的样式
  const unoElement = document.createElement("div");
  unoElement.innerText = "hello, Weback + UnoCSS";
  unoElement.classList = ["text-red"];
  element.appendChild(unoElement);

  return element;
}

document.body.appendChild(component());

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
  return element;
}

document.body.appendChild(component());

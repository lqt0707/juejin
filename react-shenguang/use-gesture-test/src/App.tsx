import { useSprings, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import "./App.css";
import { useRef } from "react";

const pages = [
  "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];

function Viewpager() {
  const width = window.innerWidth;
  const index = useRef(0);

  const [props, api] = useSprings(pages.length, (i) => ({
    x: i * width,
    scale: 1,
  }));

  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], cancel }) => {
      // 拖动的距离大于一半
      if (active && Math.abs(mx) > width / 2) {
        // 改变index
        let newIndex = index.current + (xDir > 0 ? -1 : 1);
        // 边界处理
        if (newIndex < 0) {
          newIndex = 0;
        }
        if (newIndex > pages.length - 1) {
          newIndex = pages.length - 1;
        }

        index.current = newIndex;

        cancel();
      }
      api.start((i) => {
        // 根据拖动距离来计算每个元素的 x 和 scale：
        const x = (i - index.current) * width + (active ? mx : 0);
        const scale = active ? 1 - Math.abs(mx) / width / 2 : 1;
        return { x, scale };
      });
    }
  );

  return (
    <div className="wrapper">
      {props.map(({ x, scale }, i) => (
        <animated.div className="page" {...bind()} key={i} style={{ x }}>
          <animated.div
            style={{ scale, backgroundImage: `url(${pages[i]})` }}
          />
        </animated.div>
      ))}
    </div>
  );
}

export default Viewpager;

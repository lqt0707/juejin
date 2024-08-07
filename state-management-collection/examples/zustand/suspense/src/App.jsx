import { Suspense } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const use = (promise) => {
  if (promise.status === "pending") {
    throw promise;
  } else if (promise.status === "fulfilled") {
    return promise.value;
  } else if (promise.status === "rejected") {
    throw promise.reason;
  } else {
    promise.status = "pending";
    promise.then(
      (v) => {
        promise.status = "fulfilled";
        promise.value = v;
      },
      (e) => {
        promise.status = "rejected";
        promise.reason = e;
      }
    );
    throw promise;
  }
};
const delay = (t) =>
  new Promise((r) => {
    setTimeout(r, t);
  });

const cachePool = {};
function fetchData(id) {
  const cache = cachePool[id];
  if (cache) {
    return cache;
  }
  return (cachePool[id] = delay(2000).then(() => {
    return { data: Math.random().toFixed(2) * 100 };
  }));
}

const Display = () => {
  const { data } = use(fetchData(0));
  return <div>value: {data}</div>;
};

function App() {
  return (
    <Suspense>
      <Display />
    </Suspense>
  );
}

export default App;

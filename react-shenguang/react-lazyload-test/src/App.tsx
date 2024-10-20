import React from "react";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import LazyLoad from "./MyLazyLoad";

const LazyGuang = React.lazy(() => import("./Guang"));

export default function App() {
  return (
    <div>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <LazyLoad placeholder={<div>loading...</div>} offset={500}>
        <LazyGuang />
      </LazyLoad>
      <LazyLoad placeholder={<div>loading...</div>}>
        <img src={img1} />
      </LazyLoad>
      <LazyLoad placeholder={<div>loading...</div>}>
        <img src={img2} />
      </LazyLoad>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import MutateObserver from "./MutateObserver/MutateObserver";

// export default function App() {
//   const [className, setClassName] = useState("aaa");

//   useEffect(() => {
//     setTimeout(() => setClassName("bbb"), 2000);
//   }, []);

//   const callback = function (mutationsList: MutationRecord[]) {
//     console.log(mutationsList);
//   };

//   return (
//     <div>
//       <MutateObserver onMutate={callback}>
//         <div id="container">
//           <div className={className}>
//             {className === "aaa" ? (
//               <div>aaa</div>
//             ) : (
//               <div>
//                 <p>bbb</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </MutateObserver>
//     </div>
//   );
// }

import CopyToClipboard from "./CopyToClipboard";

export default function App() {
  return (
    <CopyToClipboard
      text={"神说要有光2"}
      onCopy={() => {
        console.log("done");
      }}
    >
      <div onClick={() => alert(1)}>复制</div>
    </CopyToClipboard>
  );
}

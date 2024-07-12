import React, { useState } from "react";
import { produce } from "./produce.js";
import { create } from "zustand";

let renderCount = 0;

const useStore = create((set) => ({
  deep: {
    nested: {
      obj: {
        count: 1,
      },
    },
  },
  increment: () =>
    set((state) =>
      produce(state, (draft) => {
        draft.deep.nested.obj.count++;
      })
    ),
}));

function App() {
  const {
    deep: {
      nested: {
        obj: { count },
      },
    },
    increment,
  } = useStore();

  return (
    <div>
      <div>{count}</div>
      <button onClick={increment}>+1</button>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

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

const Display = () => {
  renderCount++; // 每次re-render就会增加1
  const { todos } = useStore();
  return (
    <div>
      {todos.map((todo, index) => {
        <div>title:{todo.title}</div>;
      })}
    </div>
  );
};

const control = () => {
  const { setFilter } = useStore();
  return (
    <button
      onClick={() => {
        setFilter("completed");
      }}
    >
      dispatch
    </button>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

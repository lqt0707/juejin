import React from "react";
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "./App";
import Toggle from "./Toggle";
import { act } from "react";
import useCounter from "./useCounter";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders learn react link", () => {
  const { container } = render(<App />);
  const linkElement = container.querySelector(".App-link");

  expect(linkElement?.textContent).toMatch(/learn react/i);
});

test("toggle", async () => {
  const { container } = render(<Toggle />);
  expect(container.querySelector("p")?.textContent).toBe("close");
  fireEvent.click(container.querySelector("button")!);
  // expect(container.querySelector("p")?.textContent).toBe("open");
  await waitFor(
    () => expect(container.querySelector("p")?.textContent).toBe("close"),
    {
      timeout: 3000,
    }
  );
});

test("toggle act", async () => {
  const { container } = render(<Toggle />);
  expect(container.querySelector("p")?.textContent).toBe("close");

  act(() => {
    fireEvent.click(container.querySelector("button")!);
  });

  await waitFor(
    () => expect(container.querySelector("p")?.textContent).toBe("close"),
    {
      timeout: 3000,
    }
  );
});

test("useCounter", async () => {
  const hook = renderHook(() => useCounter(0));

  const [count, increment, decrement] = hook.result.current;

  act(() => {
    increment(2);
  });
  expect(hook.result.current[0]).toBe(2);

  act(() => {
    decrement(3);
  });
  expect(hook.result.current[0]).toBe(-1);

  hook.unmount();
});

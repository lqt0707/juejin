import useCounter from "../useCounter";
import { describe, expect, test, it } from "@jest/globals";

describe("useCounter 测试", () => {
  it("数字加1", () => {
    const [counter, { add }] = useCounter(7);
    expect(counter).toEqual(7);
    add();
    expect(counter).toEqual(8);
  });
});

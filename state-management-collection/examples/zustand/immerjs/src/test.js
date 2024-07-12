import { produce } from "./produce";

const baseState = {
  deep: {
    nested: {
      obj: {
        count: 1,
      },
    },
    innerItems: ["item1", "item2"],
  },
  items: [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ],
};

const modifiedState = produce(baseState, (draft) => {
  draft.deep.nested.obj.count = 2;
  draft.deep.innerItems.push("item3");
  draft.items.push({ id: 3, name: "Item 3" });
});

console.log(
  "不会改动到原始的状态",
  baseState !== modifiedState,
  baseState.deep.nested.obj.count === 1
); // true true
console.log(
  "modifiedState上count状态更新为2",
  modifiedState.deep.nested.obj.count === 2
); // true
console.log(
  "没改动到的状态则会复用",
  baseState.items === modifiedState.items,
  baseState.deep.innerItems === modifiedState.deep.innerItems
); // true true

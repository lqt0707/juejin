import { useState } from "react";
import { MessageProps, Position } from ".";

type MessageList = {
  top: MessageProps[];
  bottom: MessageProps[];
};

const initialState = {
  top: [],
  bottom: [],
};

function useStore(defaultPosition: Position) {
  const [messageList, setMessageList] = useState<MessageList>({
    ...initialState,
  });

  return {
    messageList,
    add: (messageProps: MessageProps) => {
      const id = getId(messageProps);
      setMessageList((preState) => {
        // 如果存在 id 则不添加
        if (messageProps?.id) {
          const position = getMessagePosition(preState, messageProps.id);
          if (position) {
            return preState;
          }
        }
        // 如果不存在 id 则添加
        const position = messageProps.position || defaultPosition;
        const isTop = position.includes("top");
        const messages = isTop
          ? [{ ...messageProps, id }, ...(preState[position] || [])]
          : [...(preState[position] || []), { ...messageProps, id }];
        return {
          ...preState,
          [position]: messages,
        };
      });
      return id;
    },
    update: (id: number, messageProps: MessageProps) => {
      if (!id) {
        return;
      }
      setMessageList((preState) => {
        const nextState = { ...preState };
        // 找到对应位置和 index 的 message
        const { position, index } = findMessage(nextState, id);
        if (position && index !== -1) {
          // 更新 message
          nextState[position][index] = {
            ...nextState[position][index],
            ...messageProps,
          };
        }
        return nextState;
      });
    },
    remove: (id: number) => {
      setMessageList((preState) => {
        const position = getMessagePosition(preState, id);
        if (!position) {
          return preState;
        }
        return {
          ...preState,
          [position]: preState[position].filter((item) => item.id !== id),
        };
      });
    },
    clearAll: () => {
      setMessageList({ ...initialState });
    },
  };
}

export default useStore;

let count = 1;
export function getId(messageProps: MessageProps) {
  if (messageProps.id) {
    return messageProps.id;
  } else {
    return count++;
  }
}

export function getMessagePosition(messageList: MessageList, id: number) {
  for (const [position, list] of Object.entries(messageList)) {
    if (list.find((item) => item.id === id)) {
      return position as Position;
    }
  }
}

export function findMessage(messageList: MessageList, id: number) {
  const position = getMessagePosition(messageList, id);
  const index = position
    ? messageList[position].findIndex((item) => item.id === id)
    : -1;
  return { position, index };
}

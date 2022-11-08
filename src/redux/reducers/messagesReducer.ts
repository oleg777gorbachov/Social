import { ActionMessagesType, ActionsMessages } from "../types";

const initialState: messageType[] = [
  {
    id: 0,
    messages: [
      {
        type: "you",
        message: "Hello",
        id: 0,
      },
    ],
  },
  {
    id: 1,
    messages: [
      {
        type: "you",
        message: "Hello",
        id: 0,
      },
    ],
  },
  {
    id: 2,
    messages: [
      {
        type: "companion",
        message: "Hello",
        id: 0,
      },
      {
        type: "you",
        message: "Hello",
        id: 1,
      },
    ],
  },
  {
    id: 3,
    messages: [],
  },
];

export type messageType = {
  id: number;
  messages: messagesList[];
};

export type messagesList = {
  type: "you" | "companion";
  message: string;
  id: number;
};

const messagesReducer = (
  state = initialState,
  action: ActionMessagesType
): messageType[] => {
  const { type, payload } = action;
  let item = state;
  if (payload) {
    item = state.filter((e) => (e.id === payload.id ? e : ""));
  }
  switch (type) {
    case ActionsMessages.ADD_NEW_USER_MESSAGES:
      console.log([...state, payload]);
      return [...state, payload];
    case ActionsMessages.REMOVE_MESSAGE:
      const message = item[0].messages.filter(
        (e) => e.id === payload.messageID
      )[0];
      const MessageList = [
        item[0].messages.slice(0, item[0].messages.indexOf(message)),
        item[0].messages.slice(
          item[0].messages.indexOf(message),
          item[0].messages.length - 1
        ),
      ].flat();
      item[0].messages = MessageList;
      return [...state];
    case ActionsMessages.ADD_MESSAGE:
      item[0].messages.push({
        id: new Date().getTime(),
        message: payload.message,
        type: "you",
      });
      return [...state];
    default:
      return state;
  }
};

export default messagesReducer;

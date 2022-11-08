import { ContactActions } from "./../types/index";
import { useDispatch } from "react-redux";
import { ActionUserType } from "../types";

const initialState: ContactType[] = [
  {
    id: 0,
    image: "./images/avatar2.jpg",
    description: "HR",
    name: "Daniel",
    isNotificationBlocked: false,
    isBlocked: false,
    phone: 15163662371,
  },
  {
    id: 1,
    image: "./images/avatar1.jpg",
    description: "UI UX Designer",
    name: "Andriana",
    isNotificationBlocked: false,
    isBlocked: false,
    phone: 12089692890,
  },
  {
    id: 2,
    image: "./images/avatar3.jpg",
    description: "Farmer",
    name: "Bogdan",
    isNotificationBlocked: false,
    isBlocked: true,
    phone: 15056543642,
  },
  {
    id: 3,
    image: "./images/avatar4.jpg",
    description: "Front End Dev",
    name: "Vanya",
    isNotificationBlocked: true,
    isBlocked: false,
    phone: 15056804837,
  },
];

export type ContactType = {
  id: number;
  image: string;
  name: string;
  description: string;
  isNotificationBlocked: boolean;
  isBlocked: boolean;
  phone: number;
};

export const ContactSetNameAction = (id: number | null, name: string) => {
  useDispatch()({
    type: ContactActions.SET_NAME,
    payload: {
      id: id,
      name: name,
    },
  });
};

const contactReducer = (
  state = initialState,
  action: ActionUserType
): ContactType[] => {
  const { type, payload } = action;
  let item = state;
  if (payload) {
    item = state.filter((e) => (e.id === payload.id ? e : ""));
  }
  switch (type) {
    case ContactActions.ADD_NEW_USER:
      return [...state, payload];
    case ContactActions.BLOCK_UNBLOCK_USER:
      item[0].isBlocked = payload.isBlocked;
      return [...state];
    case ContactActions.NOTIFICATION_SET:
      item[0].isNotificationBlocked = payload.notificationState;
      return [...state];
    case ContactActions.REMOVE_CONTACT:
      return [
        state.slice(0, state.indexOf(item[0])),
        state.slice(state.indexOf(item[0]), state.length - 1),
      ].flat();
    case ContactActions.SET_NAME:
      item[0].name = payload.name;
      return [...state];
    default:
      return state;
  }
};

export default contactReducer;

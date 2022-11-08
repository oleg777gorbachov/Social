import { messagesList } from "../reducers/messagesReducer";

export enum ContactActions {
  SET_NAME = "SET_NAME",
  REMOVE_CONTACT = "REMOVE_CONTACT",
  BLOCK_UNBLOCK_USER = "BLOCK_UNBLOCK_USER",
  NOTIFICATION_SET = "NOTIFICATION_SET",
  ADD_NEW_USER = "ADD_NEW_USER",
}

type ContactSetNameActionType = {
  type: typeof ContactActions.SET_NAME;
  payload: {
    id: number;
    name: string;
  };
};

type ContactRemoveActionType = {
  type: typeof ContactActions.REMOVE_CONTACT;
  payload: {
    id: number;
  };
};

type ContactBlockActionType = {
  type: typeof ContactActions.BLOCK_UNBLOCK_USER;
  payload: {
    id: number;
    isBlocked: boolean;
  };
};

type ContactNotificationActionType = {
  type: typeof ContactActions.NOTIFICATION_SET;
  payload: {
    id: number;
    notificationState: boolean;
  };
};

type ContactAddUserActionType = {
  type: typeof ContactActions.ADD_NEW_USER;
  payload: {
    id: number;
    image: string;
    name: string;
    description: string;
    isNotificationBlocked: boolean;
    isBlocked: boolean;
    phone: number;
  };
};

export type ActionUserType =
  | ContactSetNameActionType
  | ContactBlockActionType
  | ContactRemoveActionType
  | ContactNotificationActionType
  | ContactAddUserActionType;

//===================================================//

export enum InteractAction {
  SET_INTERACT_ID = "SET_INTERACT_ID",
  SET_MODAL_STATE = "SET_MODAL_STATE",
  SET_SETTINGS_STATE = "SET_SETTINGS_STATE",
  SET_MENU_STATE = "SET_MENU_STATE",
  SET_CALL_STATE = "SET_CALL_STATE",
}

type ActionInteractStateType = {
  type:
    | typeof InteractAction.SET_MODAL_STATE
    | typeof InteractAction.SET_MENU_STATE
    | typeof InteractAction.SET_SETTINGS_STATE
    | typeof InteractAction.SET_CALL_STATE;
  payload: {
    state: boolean;
  };
};

type ActionInteractIDType = {
  type: typeof InteractAction.SET_INTERACT_ID;
  payload: {
    id: number;
  };
};

export type ActionInteractType = ActionInteractStateType | ActionInteractIDType;

//===================================================//

export enum ActionsMessages {
  ADD_MESSAGE = "ADD_MESSAGE",
  REMOVE_MESSAGE = "REMOVE_MESSAGE",
  ADD_NEW_USER_MESSAGES = "ADD_NEW_USER_MESSAGES",
}

type ActionMessageAddType = {
  type: typeof ActionsMessages.ADD_MESSAGE;
  payload: {
    id: number;
    message: string;
  };
};

type ActionMessageRemoveType = {
  type: typeof ActionsMessages.REMOVE_MESSAGE;
  payload: {
    id: number;
    messageID: number;
  };
};

type ActionNewUserMessagesType = {
  type: typeof ActionsMessages.ADD_NEW_USER_MESSAGES;
  payload: {
    id: number;
    messages: messagesList[];
  };
};

export type ActionMessagesType =
  | ActionMessageRemoveType
  | ActionMessageAddType
  | ActionNewUserMessagesType;

import { ActionInteractType, InteractAction } from "../types";

type initialStateType = {
  id: number;
  modalState: boolean;
  menuState: boolean;
  settingsState: boolean;
  isCalling: boolean;
};

const initialState: initialStateType = {
  id: -1,
  modalState: false,
  menuState: true,
  settingsState: false,
  isCalling: false,
};

const interactReducer = (
  state = initialState,
  action: ActionInteractType
): initialStateType => {
  const { type, payload } = action;
  switch (type) {
    case InteractAction.SET_CALL_STATE:
      return { ...state, isCalling: payload.state };
    case InteractAction.SET_SETTINGS_STATE:
      return { ...state, settingsState: payload.state };
    case InteractAction.SET_MENU_STATE:
      return { ...state, menuState: payload.state };
    case InteractAction.SET_MODAL_STATE:
      return { ...state, modalState: payload.state };
    case InteractAction.SET_INTERACT_ID:
      return { ...state, id: payload.id };
    default:
      return state;
  }
};

export default interactReducer;

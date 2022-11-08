import { combineReducers, createStore } from "redux";
import contactReducer from "./reducers/contactsReducer";
import interactReducer from "./reducers/interactReducer";
import messagesReducer from "./reducers/messagesReducer";

const reducers = combineReducers({
  contactReducer,
  interactReducer,
  messagesReducer,
});

const store = createStore(reducers);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

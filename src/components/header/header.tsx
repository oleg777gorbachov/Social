import React from "react";
import { CaretLeftOutlined, SettingOutlined } from "@ant-design/icons";
import "./header.css";
import { useTypedSelector } from "../../hooks/TypedSelector";
import { useTypedDispatch } from "../../hooks/TypedDispatch";
import { InteractAction } from "../../redux/types";

function Header() {
  const menuState = useTypedSelector(
    (store) => store.interactReducer.menuState
  );
  const settingsState = useTypedSelector(
    (store) => store.interactReducer.settingsState
  );
  const dispatch = useTypedDispatch();
  return (
    <header>
      <nav>
        <SettingOutlined
          className="icon-box"
          onClick={() => {
            dispatch({
              type: InteractAction.SET_SETTINGS_STATE,
              payload: {
                state: !settingsState,
              },
            });
            dispatch({
              type: InteractAction.SET_MODAL_STATE,
              payload: { state: false },
            });
          }}
        />
        <h2>Contacts</h2>
        <CaretLeftOutlined
          className="icon-box"
          onClick={(e) => {
            dispatch({
              type: InteractAction.SET_MENU_STATE,
              payload: { state: !menuState },
            });
          }}
        />
      </nav>
      <div>
        <img
          src="https://avatars.githubusercontent.com/u/49271216?v=4"
          alt="avatar"
          className="user-avatar"
        />
      </div>
    </header>
  );
}

export default Header;

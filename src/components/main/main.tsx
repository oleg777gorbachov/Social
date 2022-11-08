import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import {
  SettingOutlined,
  PhoneOutlined,
  AudioOutlined,
  AudioMutedOutlined,
} from "@ant-design/icons";
import "./main.css";
import { useTypedDispatch } from "../../hooks/TypedDispatch";
import { useTypedSelector } from "../../hooks/TypedSelector";
import { ActionsMessages, InteractAction } from "../../redux/types";

function Main() {
  const dispatch = useTypedDispatch();
  const userID = useTypedSelector((store) => store.interactReducer.id);
  const user = useTypedSelector((store) =>
    store.contactReducer.filter((e) => (e.id === userID ? e : ""))
  );
  const messages = useTypedSelector((store) =>
    store.messagesReducer.filter((e) => (e.id === userID ? e : ""))
  );
  const menuState = useTypedSelector(
    (store) => store.interactReducer.menuState
  );
  const modalState = useTypedSelector(
    (store) => store.interactReducer.modalState
  );
  const callState = useTypedSelector(
    (store) => store.interactReducer.isCalling
  );
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    let timeout: any;
    if (callState) {
      timeout = setTimeout(() => {
        dispatch({
          type: InteractAction.SET_CALL_STATE,
          payload: {
            state: false,
          },
        });
      }, 15000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [callState]);
  const [Microphone, setMicrophone] = useState(true);
  const MircophoneFunc = () => {
    setMicrophone(!Microphone);
  };
  if (callState) {
    return (
      <main className="call">
        <div>
          <audio src="apple.mp3" autoPlay></audio>
        </div>

        <div style={{ textAlign: "center" }}>
          <img src={user[0].image} alt="avatar" className="avatar" />
          <h2 style={{ color: "white" }}>{user[0].name}</h2>
        </div>
        <div className="options">
          <PhoneOutlined
            style={{
              background: "#ff6a6a",
            }}
            className="options-icon"
            onClick={() => {
              dispatch({
                type: InteractAction.SET_CALL_STATE,
                payload: {
                  state: false,
                },
              });
            }}
          />
          {Microphone ? (
            <AudioOutlined className="options-icon" onClick={MircophoneFunc} />
          ) : (
            <AudioMutedOutlined
              className="options-icon"
              onClick={MircophoneFunc}
            />
          )}
        </div>
      </main>
    );
  }
  return (
    <main className={menuState ? "" : "main"}>
      {user.length > 0 ? (
        <>
          <div className="main-header">
            <h3>{user[0].name}</h3>
            {user[0].isBlocked ? (
              <h4 style={{ color: "red" }}>User Blocked</h4>
            ) : (
              ""
            )}
            {user[0].isNotificationBlocked ? (
              <h4 style={{ color: "blue" }}>Notification off</h4>
            ) : (
              ""
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <PhoneOutlined
                className="contact-btn"
                onClick={() => {
                  if (!callState) {
                    dispatch({
                      type: InteractAction.SET_CALL_STATE,
                      payload: { state: true },
                    });
                  }
                }}
              />
              <SettingOutlined
                className="contact-btn"
                onClick={() => {
                  dispatch({
                    type: InteractAction.SET_MODAL_STATE,
                    payload: { state: !modalState },
                  });
                  dispatch({
                    type: InteractAction.SET_SETTINGS_STATE,
                    payload: { state: false },
                  });
                }}
              />
              <img
                src={user[0].image}
                alt="user-avatar"
                className="user-avatar"
              />
            </div>
          </div>
          <div className="chat">
            <div className="window-chat">
              {messages[0].messages.length > 0 ? (
                messages[0].messages.map((e) => {
                  if (e.type === "you") {
                    return (
                      <div className="you" key={e.id}>
                        <span>{e.message}</span>
                        <div className="delete-message">
                          <span
                            onClick={() => {
                              dispatch({
                                type: ActionsMessages.REMOVE_MESSAGE,
                                payload: {
                                  id: userID,
                                  messageID: e.id,
                                },
                              });
                            }}
                          >
                            delete message
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div className="companion" key={e.id}>
                      <span>{e.message}</span>
                    </div>
                  );
                })
              ) : (
                <div className="nothing">No messages</div>
              )}
            </div>
            <div className="sendMessage">
              <Input
                placeholder="Message"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setInputValue(e.target.value);
                }}
                onKeyUp={(e) => {
                  if (e.code === "Enter") {
                    dispatch({
                      type: ActionsMessages.ADD_MESSAGE,
                      payload: { id: userID, message: inputValue },
                    });
                    setInputValue("");
                  }
                }}
                style={{ width: "100%" }}
              />
              <Button
                type="primary"
                onClick={() => {
                  dispatch({
                    type: ActionsMessages.ADD_MESSAGE,
                    payload: { id: userID, message: inputValue },
                  });
                  setInputValue("");
                }}
              >
                Send Message
              </Button>
            </div>
          </div>
        </>
      ) : (
        <h3>You don't select dialog</h3>
      )}
    </main>
  );
}

export default Main;

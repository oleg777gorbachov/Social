import React, { useState, useEffect } from "react";
import s from "./modal.module.css";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Switch, Input } from "antd";
import { ContactActions, InteractAction } from "../../redux/types";
import { useTypedDispatch } from "../../hooks/TypedDispatch";
import { useTypedSelector } from "../../hooks/TypedSelector";

function Modal() {
  const dispatch = useTypedDispatch();
  const userID = useTypedSelector((store) => store.interactReducer.id);
  const users = useTypedSelector((store) => store.contactReducer);
  const user = users.filter((e) => (e.id === userID ? e : ""));
  const [edited, setEdited] = useState(false);
  const [inputValue, setInputValue] = useState(user[0].name);
  useEffect(() => {
    setInputValue(user[0].name);
  }, [userID]);

  return (
    <div className={s.modal}>
      <CloseOutlined
        className={s.close}
        onClick={() => {
          dispatch({
            type: InteractAction.SET_MODAL_STATE,
            payload: { state: false },
          });
        }}
      />
      <div className={s.item}>
        <div>
          <h3>
            {edited ? (
              <Input
                value={inputValue}
                style={{ width: "50%" }}
                maxLength={25}
                onKeyUp={(e) => {
                  if (e.code === "Enter") {
                    dispatch({
                      type: ContactActions.SET_NAME,
                      payload: {
                        id: userID,
                        name: inputValue,
                      },
                    });
                    setEdited(false);
                  }
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setInputValue(e.target.value);
                }}
              />
            ) : (
              user[0].name
            )}{" "}
            <EditOutlined
              style={{ fontSize: "18px" }}
              onClick={() => {
                setEdited(!edited);
              }}
            />
          </h3>{" "}
          <p>{user[0].description}</p>
        </div>
        <img src={user[0].image} alt="avatar-user" className="user-avatar" />
      </div>
      <div
        style={{ marginTop: "40px", gap: "8px", flexDirection: "column" }}
        className={s.item}
      >
        <div className={s.item}>Phone: +{user[0].phone}</div>
        <div className={s.item}>
          <span>Notification</span>{" "}
          {user[0].isNotificationBlocked ? (
            <Switch
              checked
              onClick={(e) => {
                dispatch({
                  type: ContactActions.NOTIFICATION_SET,
                  payload: {
                    id: userID,
                    notificationState: e,
                  },
                });
              }}
            />
          ) : (
            <Switch
              onClick={(e) => {
                dispatch({
                  type: ContactActions.NOTIFICATION_SET,
                  payload: {
                    id: userID,
                    notificationState: e,
                  },
                });
              }}
            />
          )}
        </div>
        <div className={s.item}>
          <span>Block</span>{" "}
          {user[0].isBlocked ? (
            <Switch
              checked
              onClick={(e) => {
                dispatch({
                  type: ContactActions.BLOCK_UNBLOCK_USER,
                  payload: {
                    id: userID,
                    isBlocked: e,
                  },
                });
              }}
            />
          ) : (
            <Switch
              onClick={(e) => {
                dispatch({
                  type: ContactActions.BLOCK_UNBLOCK_USER,
                  payload: {
                    id: userID,
                    isBlocked: e,
                  },
                });
              }}
            />
          )}
        </div>
        <div
          className={s.remove}
          onClick={() => {
            dispatch({
              type: ContactActions.REMOVE_CONTACT,
              payload: { id: userID },
            });
            dispatch({
              type: InteractAction.SET_MODAL_STATE,
              payload: { state: false },
            });
          }}
        >
          Remove From Contacts
        </div>
      </div>
    </div>
  );
}

export default Modal;

import React from "react";
import {
  MessageOutlined,
  SettingOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { InteractAction } from "../../../redux/types";
import { useTypedDispatch } from "../../../hooks/TypedDispatch";
import { useTypedSelector } from "../../../hooks/TypedSelector";

export type ContactComponentType = {
  id: number;
  image: string;
  name: string;
  description: string;
};

function Contact({ image, name, description, id }: ContactComponentType) {
  const dispatch = useTypedDispatch();
  const callState = useTypedSelector(
    (store) => store.interactReducer.isCalling
  );
  const modalState = useTypedSelector(
    (store) => store.interactReducer.modalState
  );
  return (
    <>
      <div
        className="contact"
        onClick={() => {
          if (!callState) {
            dispatch({
              type: InteractAction.SET_INTERACT_ID,
              payload: { id },
            });
          }
        }}
      >
        <img src={image} alt="avatar" className="user-avatar" />
        <div className="description">
          <div>
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
          <div className="contact-btns">
            <MessageOutlined className="contact-btn" />
            <PhoneOutlined
              className="contact-btn"
              onClick={() => {
                dispatch({
                  type: InteractAction.SET_CALL_STATE,
                  payload: {
                    state: true,
                  },
                });
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;

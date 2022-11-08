import {
  CloseOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useTypedDispatch } from "../../hooks/TypedDispatch";
import { InteractAction } from "../../redux/types";
import s from "./modal.module.css";
import ModalBlock from "./modalBlock";
import ModalContact from "./modalContact";

function ModalSettings() {
  const dispatch = useTypedDispatch();
  const [ContactState, setContactState] = useState(false);
  const [BlockState, setBlockState] = useState(false);

  return (
    <div className={s.modal}>
      {ContactState || BlockState ? (
        <RollbackOutlined
          className={s.back}
          onClick={() => {
            setContactState(false);
            setBlockState(false);
          }}
        />
      ) : (
        ""
      )}
      <CloseOutlined
        className={s.close}
        onClick={() => {
          dispatch({
            type: InteractAction.SET_SETTINGS_STATE,
            payload: { state: false },
          });
        }}
      />
      {ContactState || BlockState ? (
        ContactState ? (
          <ModalContact />
        ) : (
          <ModalBlock />
        )
      ) : (
        <>
          {" "}
          <h2>Settings</h2>
          <div className={s.items}>
            <div className={s.item}>
              <span>New Contact</span>
              <PlusOutlined
                className="icon-box"
                onClick={() => {
                  setContactState(true);
                }}
              />
            </div>
            <div className={s.item}>
              <span>Block List</span>
              <ExclamationCircleOutlined
                className="icon-box"
                onClick={() => {
                  setBlockState(true);
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ModalSettings;

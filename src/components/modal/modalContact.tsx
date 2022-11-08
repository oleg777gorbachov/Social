import { Button, Input } from "antd";
import React, { useState } from "react";
import { useTypedDispatch } from "../../hooks/TypedDispatch";
import { ActionsMessages, ContactActions } from "../../redux/types";
import s from "./modal.module.css";

function ModalContact() {
  const dispatch = useTypedDispatch();
  const [ValidateSettings, setValidateSettings] = useState({
    name: false,
    desc: false,
    phone: false,
  });
  const [NameValidate, setNameValidate] = useState("");
  const [DescValidate, setDescValidate] = useState("");
  const [PhoneValidate, setPhoneValidate] = useState("");
  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValidate(e.target.value);
  };
  const descChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescValidate(e.target.value);
  };
  const phoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValidate(e.target.value);
  };
  const Validate = () => {
    const phone = parseInt(PhoneValidate);
    let isNameError = false;
    let isDescError = false;
    let isPhoneError = false;

    if (NameValidate.length === 0) {
      isNameError = true;
    }
    if (DescValidate.length === 0) {
      isDescError = true;
    }
    if (PhoneValidate.length < 8 || isNaN(phone)) {
      isPhoneError = true;
    }
    if (!isNaN(phone) && PhoneValidate.length > 8) {
      const id = new Date().getTime();
      dispatch({
        type: ContactActions.ADD_NEW_USER,
        payload: {
          id: id,
          description: DescValidate,
          image: "./images/avatar.png",
          isBlocked: false,
          isNotificationBlocked: false,
          name: NameValidate,
          phone: phone,
        },
      });
      dispatch({
        type: ActionsMessages.ADD_NEW_USER_MESSAGES,
        payload: {
          id: id,
          messages: [],
        },
      });
      setNameValidate("");
      setDescValidate("");
      setPhoneValidate("");
    }
    setValidateSettings({
      name: isNameError,
      desc: isDescError,
      phone: isPhoneError,
    });
  };
  return (
    <>
      <h2>Add New Contact</h2>
      <div className={s.items}>
        <div className={s.item}>
          <span style={{ width: "50%" }}>Name</span>
          <Input
            placeholder="Name"
            maxLength={25}
            value={NameValidate}
            onChange={nameChange}
            status={ValidateSettings.name ? "error" : ""}
          />
        </div>
        <div className={s.item}>
          <span style={{ width: "50%" }}>Description</span>
          <Input
            placeholder="Description"
            value={DescValidate}
            onChange={descChange}
            status={ValidateSettings.desc ? "error" : ""}
          />
        </div>
        <div className={s.item}>
          <span style={{ width: "50%" }}>Phone</span>
          <Input
            placeholder="Description"
            value={PhoneValidate}
            onChange={phoneChange}
            status={ValidateSettings.phone ? "error" : ""}
          />
        </div>
      </div>
      <Button type="primary" style={{ marginTop: "10px" }} onClick={Validate}>
        Add Contact
      </Button>
    </>
  );
}

export default ModalContact;

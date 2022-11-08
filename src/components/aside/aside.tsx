import React, { useState, useEffect } from "react";
import { Input } from "antd";
import "./aside.css";
import Contact from "./contact/contact";
import { useTypedSelector } from "../../hooks/TypedSelector";

function Aside() {
  const contacts = useTypedSelector((store) => store.contactReducer);
  const filter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContactToShow(
      contacts.filter((e) => e.name.toLowerCase().includes(value.toLowerCase()))
    );
  };
  let [contactsToShow, setContactToShow] = useState(contacts);
  const menuState = useTypedSelector(
    (store) => store.interactReducer.menuState
  );
  useEffect(() => {
    setContactToShow(contacts);
  }, [contacts]);

  return (
    <div className={menuState ? "aside" : "aside aside-off"}>
      <div>
        <p>Search for your contacts</p>
        <Input placeholder="Contact Name" onChange={filter} />
      </div>
      <div style={{ marginTop: "30px" }}>
        <h2>Your Contacts</h2>
        {contactsToShow.map((e) => {
          return (
            <Contact
              name={e.name}
              description={e.description}
              image={e.image}
              id={e.id}
              key={e.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Aside;

import React from "react";
import "./App.css";
import Aside from "./components/aside/aside";
import Header from "./components/header/header";
import Main from "./components/main/main";
import Modal from "./components/modal/modal";
import ModalSettings from "./components/modal/modalSettings";
import { useTypedSelector } from "./hooks/TypedSelector";

function App() {
  const modalState = useTypedSelector(
    (store) => store.interactReducer.modalState
  );
  const settingsState = useTypedSelector(
    (store) => store.interactReducer.settingsState
  );
  return (
    <div className="App">
      <Header />
      <Aside />
      <Main />
      {modalState ? <Modal /> : ""}
      {settingsState ? <ModalSettings /> : ""}
    </div>
  );
}

export default App;

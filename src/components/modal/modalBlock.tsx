import React from "react";
import { useTypedDispatch } from "../../hooks/TypedDispatch";
import { useTypedSelector } from "../../hooks/TypedSelector";
import { ContactActions } from "../../redux/types";
import s from "./modal.module.css";

function ModalBlock() {
  const dispatch = useTypedDispatch();
  const users = useTypedSelector((store) => store.contactReducer);
  const usersToShow = users.filter((e) => e.isBlocked === true);
  return (
    <>
      <h2>Blocklist</h2>
      <div className={s.items}>
        {usersToShow.length > 0
          ? usersToShow.map((e) => {
              return (
                <div className={s.item} key={e.id}>
                  <span style={{ width: "50%" }}>{e.name}</span>
                  <span
                    style={{ color: "green" }}
                    onClick={() => {
                      dispatch({
                        type: ContactActions.BLOCK_UNBLOCK_USER,
                        payload: {
                          id: e.id,
                          isBlocked: false,
                        },
                      });
                    }}
                  >
                    Unblock
                  </span>
                </div>
              );
            })
          : "No blocked users"}
      </div>
    </>
  );
}

export default ModalBlock;

import React from "react";
import Axios from "axios";
import Cookies from "js-cookie";

function UpdateMessage(props) {
  //console.log(Cookies.get("uid") == props.message_uid);

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post("/api/chats/messageupdate", {
      change: {
        messageId: props.message_id,
        chatId: props.chat_id
      }
    })
      .then(props.toggler())
      .catch(err => console.log(err));
  }

  return (
    <div className="participantForm">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {Cookies.get("uid") === props.message_uid ? (
            <button className="btn btn-link" type="submit">
              {props.message_status === "visible" ? "delete" : "restore"}
            </button>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
}

export default UpdateMessage;

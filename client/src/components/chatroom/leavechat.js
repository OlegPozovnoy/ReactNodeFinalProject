import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function LeaveChat(props) {
  const [redirect, setRedirect] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    console.log("props", props);

    Axios.post("/api/chats/leavechat", {
      leave: {
        chat_id: props.chat_id
      }
    })
      .then(resp => setRedirect(true))
      .then(props.toggler())

      .catch(err => console.log(err));
  }

  if (redirect) return <Redirect to="/chats/index" />;

  return (
    <div className="leaveChat">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <button className="btn btn-danger" type="submit">
            Leave Chat
          </button>
        </div>
      </form>
    </div>
  );
}

export default LeaveChat;

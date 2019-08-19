import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function ChatsDestroy(props) {
  //console.log("destroy props", props);

  useEffect(() => {
    Axios.post("/api/chats/destroy", {
      id: props.match.params.id
    });
  }, [props]);

  return <Redirect to="/chats/index" />;
}

export default ChatsDestroy;

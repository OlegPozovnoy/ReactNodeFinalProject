import React, { useEffect, useContext } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import NotificationContext from "../notification_context";

function SessionLogout() {
  const { setNotification } = useContext(NotificationContext);

  useEffect(() => {
    Axios.post("/api/logout").then(() => {
      Cookies.remove("uid");
      setNotification(notificatoin => {
        return {
          ...notificatoin,
          status: "danger",
          message: "You were logged out"
        };
      });
    });
  }, []);

  return <Redirect to="/" />;
}

export default SessionLogout;

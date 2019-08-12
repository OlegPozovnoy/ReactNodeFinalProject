import React, { useEffect } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

function SessionLogout() {
  useEffect(() => {
    Axios.post("/api/logout").then(() => Cookies.remove("uid"));
  }, []);

  return <Redirect to="/" />;
}

export default SessionLogout;

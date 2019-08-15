import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";
import NotificationContext from "../notification_context";

function SessionLogin() {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);
  const { setNotification } = useContext(NotificationContext);
  function handleSubmit(event) {
    event.preventDefault();

    console.log("Login: ", inputs);

    Axios.post("/api/authenticate", inputs)
      .then(resp => {
        setNotification(notificatoin => {
          return {
            ...notificatoin,
            status: "success",
            message: "You were logged in"
          };
        });
        console.log(resp);
        Cookies.set("uid", resp.data.uid);
        setRedirect(true);
      })
      .catch(err => {
        setNotification(notificatoin => {
          return {
            ...notificatoin,
            status: "danger",
            message: "Error while logging in"
          };
        });
        console.log(err);
      });
  }

  function handleInputChange(event) {
    event.persist();
    const { name, value } = event.target;

    setInputs(inputs => {
      inputs[name] = value;
      return inputs;
    });
  }

  if (redirect) return <Redirect to="/chats/index" />;

  return (
    <div className="container">
      <header>
        <h1>Login</h1>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nickname</label>
            <input
              className="form-control"
              name="email"
              required="required"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              name="password"
              type="password"
              required="required"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-dark" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SessionLogin;

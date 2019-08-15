import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import NotificationContext from "../notification_context";

function SessionRegister() {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);
  const { setNotification } = useContext(NotificationContext);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Register inputs: ", inputs);

    Axios.post("/api/authors", {
      author: inputs
    })
      .then(resp => {
        console.log("resp", resp);
        setNotification(notificatoin => {
          return {
            ...notificatoin,
            status: resp.data.status,
            message: resp.data.message
          };
        });
        setRedirect(true);
      })
      .catch(err => {
        setNotification(notificatoin => {
          return {
            ...notificatoin,
            status: "danger",
            message: "Registration failed"
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

    console.log("posting", inputs);
    inputs.email &&
      inputs.email.length > 0 &&
      Axios.post("/api/authors/checkusername", {
        author: inputs
      })
        .then(result => {
          console.log("result status", result.data.status);
          setNotification(notificatoin => {
            return {
              ...notificatoin,
              status: result.data.status,
              message: result.data.message + " (" + inputs.email + ")"
            };
          });
        })
        .catch(err => console.error(err));
  }

  if (redirect) return <Redirect to="/" />;

  return (
    <div className="container">
      <header>
        <h1>New User</h1>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              className="form-control"
              name="firstName"
              required="required"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              className="form-control"
              name="lastName"
              required="required"
              onChange={handleInputChange}
            />
          </div>

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
            <label>Password Confirmation</label>
            <input
              className="form-control"
              name="passwordConfirmation"
              required="required"
              onChange={handleInputChange}
              type="password"
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

export default SessionRegister;

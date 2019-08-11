import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function ChatsNew() {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(inputs);

    Axios.post("/api/chats/create", {
      name: inputs.name
    })
      .then(resp => setRedirect(true))
      .catch(err => console.log(err));
  }

  function handleInputChange(event) {
    event.persist();
    // const name = event.target.name;
    // const value = event.target.value;
    const { name, value } = event.target;

    setInputs(inputs => {
      console.log("inputs", inputs);
      inputs[name] = value;
      return inputs;
    });
  }

  if (redirect) return <Redirect to="/chats/index" />;

  return (
    <div className="container">
      <header>
        <h1>New Chat</h1>
      </header>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Chat's name</label>
            <input
              className="form-control"
              name="name"
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

export default ChatsNew;

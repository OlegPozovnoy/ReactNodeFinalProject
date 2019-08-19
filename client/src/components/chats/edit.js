import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function ChatsEdit(props) {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  //console.log("inputs:", inputs);
  //console.log("edit props:", props);

  useEffect(() => {
    //console.log("effects triggered");
    //console.log("path:", props.match.params.id);
    //console.log("inputs:", inputs);
    Axios.get(`/api/chats/${props.match.params.id}`)
      .then(result => {
        //console.log("edit result", result);
        setInputs(result.data);
      })
      .catch(err => console.error(err));
  }, [props]);

  function handleSubmit(event) {
    event.preventDefault();
    //console.log("submitting edit", props.match.params.id, inputs.name);
    Axios.post("/api/chats/create", {
      chat_id: props.match.params.id,
      name: inputs.name
    })
      .then(resp => setRedirect(true))
      .catch(err => console.error(err));
  }

  function handleInputChange(event) {
    event.persist();

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
        <h1>Edit Chat</h1>
      </header>
      <div>
        <form action="/chats" method="POST" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Chat's name</label>
            <input
              className="form-control"
              name="name"
              required="required"
              onChange={handleInputChange}
              defaultValue={inputs.name}
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

export default ChatsEdit;

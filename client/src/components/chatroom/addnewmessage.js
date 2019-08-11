import React from "react";
import Axios from "axios";

class AddMessage extends React.Component {
  constructor(props) {
    super();
    this.state = { value: "" };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log("props", this.props);
    console.log("state", this.state);

    Axios.post("/api/chats/addnewmessage", {
      chat_id: this.props.chat_id,
      message: {
        text: this.state.value
      }
    })
      .then(this.props.toggler())
      .then(this.setState({ value: "" }))
      .catch(err => console.log(err));
  }

  handleInputChange(event) {
    event.persist();
    this.setState({ value: event.target.value });
    console.log(this.state.value);
  }

  render() {
    return (
      <div className="participantForm">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Enter your message</label>
            <input
              className="form-control"
              name="message"
              required="required"
              onChange={this.handleInputChange}
              value={this.state.value}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-dark" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddMessage;

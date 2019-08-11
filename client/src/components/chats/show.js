import React from "react";
import Axios from "axios";
import AddParticipant from "../chatroom/addparticipant";
import AddMessage from "../chatroom/addnewmessage";
import UpdateMessage from "../chatroom/messageupdate";
import LeaveChat from "../chatroom/leavechat";

class ChatsShow extends React.Component {
  constructor() {
    super();
    console.log("Constructoro");
    this.state = { toggle: true, counter: 0 };
    this.toggling = this.toggling.bind(this);
  }

  componentDidMount() {
    console.log("mouunt");

    setInterval(() => {
      this.setState({ counter: this.state.counter + 1 });
    }, 10000);

    Axios.get(`/api/chats/${this.props.match.params.id}`)
      .then(result => {
        console.log("show result", result.data);
        this.setState({ chat: result.data });
      })
      .catch(err => console.error(err));
  }

  componentDidUpdate(prevState) {
    if (
      this.state.toggle !== prevState.toggle ||
      this.state.counter !== prevState.counter
    ) {
      //console.log(this.state);
      //console.log(prevState);
      Axios.get(`/api/chats/${this.props.match.params.id}`)
        .then(result => {
          //       console.log("show result", result.data);
          this.setState({ chat: result.data });
        })
        .catch(err => console.error(err));
    }
  }

  toggling() {
    console.log("toggling");
    this.setState({ toggle: !this.state.toggle });
  }

  render() {
    //  console.log("render");
    return (
      <div className="container">
        <header>
          <h3>Chat: {this.state.chat && this.state.chat.name}</h3>
        </header>

        <div>
          <h6>Participants:</h6>
          <ul className="authorslist">
            {Array.isArray(this.state.chat && this.state.chat.authors) &&
              this.state.chat.authors.map(author => (
                <li key={author._id}> {author.email}</li>
              ))}
          </ul>
        </div>
        <AddParticipant
          chat_id={this.state.chat && this.state.chat._id}
          toggler={this.toggling}
        />
        <div>
          <table className="table table-striped  table-dark">
            <thead>
              <tr>
                <th> Who?</th>
                <th> Said what?</th>
                <th> When?</th>
                <th> More</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(this.state.chat && this.state.chat.messages) &&
                this.state.chat.messages.map(message => (
                  <tr key={message._id}>
                    <td>{message.author.email}</td>
                    <td>{message.status === "visible" && message.content}</td>
                    <td>{message.updatedAt}</td>
                    <td>
                      <UpdateMessage
                        chat_id={this.state.chat._id}
                        message_id={message._id}
                        message_status={message.status}
                        toggler={this.toggling}
                        message_uid={message.author._id}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <AddMessage
          chat_id={this.state.chat && this.state.chat._id}
          toggler={this.toggling}
        />
        <LeaveChat
          chat_id={this.state.chat && this.state.chat._id}
          toggler={this.toggling}
        />
      </div>
    );
  }
}

export default ChatsShow;

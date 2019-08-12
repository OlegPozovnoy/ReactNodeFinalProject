import React from "react";
import Axios from "axios";
import AddParticipant from "../chatroom/addparticipant";
import AddMessage from "../chatroom/addnewmessage";
import UpdateMessage from "../chatroom/messageupdate";
import LeaveChat from "../chatroom/leavechat";

class ChatsShow extends React.Component {
  constructor() {
    super();
    //console.log("Constructoro");
    this.state = { toggle: true, counter: 0 };
    this.toggling = this.toggling.bind(this);
  }

  componentDidMount() {
    //  console.log("mouunt");

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

  convertDate(dateISO) {
    return new Date(dateISO).toLocaleString();
    //date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() +" "+date.get;
  }

  convertColor(nickname) {
    var sum = 0;
    for (var i = 0; i < nickname.length; i++) {
      sum += nickname.charCodeAt(i);
    }
    //  console.log(nickname, sum);

    if (sum % 7 === 0) return "red";
    if (sum % 7 === 1) return "cyan";
    if (sum % 7 === 2) return "lightblue";
    if (sum % 7 === 3) return "yellow";
    if (sum % 7 === 4) return "lime";
    if (sum % 7 === 5) return "magenta";
    if (sum % 7 === 6) return "orange";
  }

  render() {
    //  console.log("render");
    return (
      <div className="container">
        <header>
          <h3 className="chatname">
            Chat: {this.state.chat && this.state.chat.name}
          </h3>
        </header>
        <AddParticipant
          chat_id={this.state.chat && this.state.chat._id}
          toggler={this.toggling}
        />
        <div className="authorslist">
          <h6 className="participantlist">Participants:</h6>
          <ul>
            {Array.isArray(this.state.chat && this.state.chat.authors) &&
              this.state.chat.authors.map(author => (
                <li
                  key={author._id}
                  style={{ color: this.convertColor(author.email) }}
                >
                  {" "}
                  {author.email}
                </li>
              ))}
          </ul>
        </div>

        <div>
          <table className="table table-striped  table-dark">
            <thead>
              <tr>
                <th> Who?</th>
                <th> Said what?</th>
                <th> When?</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(this.state.chat && this.state.chat.messages) &&
                this.state.chat.messages.map(message => (
                  <tr
                    key={message._id}
                    style={{ color: this.convertColor(message.author.email) }}
                  >
                    <td>{message.author.email}</td>
                    <td>{message.status === "visible" && message.content}</td>
                    <td>{this.convertDate(message.createdAt)}</td>
                    <td className="text-right">
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

import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function ChatsIndex() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    Axios.get("/api/chats/index")
      .then(result => {
        console.log("index result", result.data);
        setChats(result.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <header>
        <h1 className="chatname">Chats</h1>
      </header>

      <div>
        <table className="table table-striped table-dark">
          <tbody>
            {chats.map(chat => (
              <tr key={chat._id}>
                <td>
                  <Link to={`/chats/${chat._id}`}>{chat.name}</Link>
                </td>
                <td className="text-right">
                  <Link to={`/chats/edit/${chat._id}`}>edit</Link>|
                  <Link to={`/chats/destroy/${chat._id}`}>delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ChatsIndex;

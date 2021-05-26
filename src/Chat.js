import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

function Chat() {
  const [seed, setSeed] = useState("");
  const [roomName, setRoomName] = useState("");
  const { roomId } = useParams("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 1000));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (input) {
      db.collection("rooms").doc(roomId).collection("messages").add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setInput("");

    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <div className="chat_headerLeft">
          <Avatar src={`https://avatars.dicebear.com/api/human/:${seed}.svg`} />
          <div className="chat_headerInfo">
            <h4>{roomName}</h4>
            <p>
              last seen at{" "}
              {new Date(messages[messages.length - 1]?.timestamp?.toDate())
                .toLocaleTimeString()
                .replace(/:\d+ /, " ")}
            </p>
          </div>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <div
            className={`chat_message ${
              message.name === user.displayName && "chat_receiver"
            }`}
          >
            <p>
              {message.message}
              <span className="chat_spanTime">
                {new Date(message.timestamp?.toDate())
                  .toLocaleTimeString()
                  .replace(/:\d+ /, " ")}
              </span>
            </p>
          </div>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button type="submit" onClick={sendMessage}>
            {" "}
            Send a Message
          </button>
        </form>
        <MicIcon className="Mic" />
      </div>
    </div>
  );
}

export default Chat;

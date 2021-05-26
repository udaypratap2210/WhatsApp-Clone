import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./SideBarChat.css";
import db from "./firebase";
import { Link } from "react-router-dom";

function SideBarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 1000));
  }, []);

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [id]);

  const createChat = () => {
    const roomName = prompt("Please Enter new chat room");
    if (roomName) {
      db.collection("rooms").add({ name: roomName });
    }
  };
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="hover">
        <div className="SideBarChat">
          <Avatar src={`https://avatars.dicebear.com/api/human/:${seed}.svg`} />
          <div className="SideBarChat_UserInfo">
            <h3>{name}</h3>
            <p>{truncate(messages[0]?.message, 15)}</p>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sideBarNewChat">
      <h4>Add New Chat</h4>
    </div>
  );
}

export default SideBarChat;

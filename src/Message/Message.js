import React from "react";
import "./Message.css";

function Message({ message }) {
  return <div className="Message-container">{message}</div>;
}

export default Message;

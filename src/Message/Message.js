import React from "react";
import cake from "./cake.png";
import "./Message.css";

function Message({ message }) {
  return (
    <div className="Message-container">
      <img
        className="Message-cake"
        width="48"
        height="48"
        src={cake}
        alt="Cake"
      />
      {message}
    </div>
  );
}

export default Message;

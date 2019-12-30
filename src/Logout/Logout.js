import React from "react";
import useApp from "../useApp";
import "./Logout.css";

function Logout({ isCollapsed, email }) {
  const app = useApp();

  return (
    <div
      className={`Logout-container${
        isCollapsed ? " Logout-container-collapsed" : ""
      }`}
    >
      {email}
      <button
        className="Logout-button small-button"
        type="button"
        onClick={() => {
          app.auth().signOut();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;

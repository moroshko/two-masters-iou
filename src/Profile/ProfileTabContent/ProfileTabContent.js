import React from "react";
import useApp from "../../useApp";
import "./ProfileTabContent.css";

function ProfileTabContent({ user }) {
  const app = useApp();

  return (
    <div className="ProfileTabContent-container">
      <div className="ProfileTabContent-logged-in-as">Logged in as:</div>
      <div className="ProfileTabContent-user-email">{user.email}</div>
      <button
        className="ProfileTabContent-logout-button large-button"
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

export default ProfileTabContent;

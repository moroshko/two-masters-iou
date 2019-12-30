import React, { useState, useEffect, useMemo } from "react";
import useApp from "../useApp";
import "./Balance.css";

function Balance({ isLogoutCollapsed, onProfileIconClick }) {
  const app = useApp();
  const [data, setData] = useState({
    isLoading: true,
    levaOwesDanik: null
  });
  const { isLoading } = data;
  const balanceMessage = useMemo(() => {
    const { isLoading, levaOwesDanik } = data;

    if (isLoading) {
      return null;
    }

    const levaOwesDanikRounded = Math.round(levaOwesDanik * 100) / 100;

    return levaOwesDanikRounded === 0
      ? "All good!"
      : levaOwesDanikRounded > 0
      ? `Leva owes Danik: $${levaOwesDanikRounded}`
      : `Danik owes Leva: $${-levaOwesDanikRounded}`;
  }, [data]);

  useEffect(() => {
    const ref = app.database().ref("levaOwesDanik");
    const onValueChange = dataSnapshot => {
      setData({
        isLoading: false,
        levaOwesDanik: dataSnapshot.val()
      });
    };

    ref.on("value", onValueChange);

    return () => {
      ref.off("value", onValueChange);
    };
  }, [app]);

  return (
    <div className="Balance-container">
      {isLoading ? "Loading..." : balanceMessage}
      <button
        className={`Balance-toggle-logout-button${
          isLogoutCollapsed ? " Balance-toggle-logout-button-collapsed" : ""
        } small-button borderless-button`}
        onClick={onProfileIconClick}
        title={isLogoutCollapsed ? "Show logout" : "Hide logout"}
      >
        <svg className="Balance-profile-icon" viewBox="0 0 128 128">
          <path d="M53 13.1c-21 9.5-21.3 39.3-.5 49.4 2.2 1 6.8 2.1 10.3 2.3 5.5.4 7.1.1 12.7-2.7 11-5.4 16.2-14.5 15.3-26.5C89.6 21 78.7 11 64 11c-4.4 0-8 .7-11 2.1zM40 76.8c-5.7 5.7-8.8 9.8-10.9 14.3-2.6 5.6-5.1 15.8-5.1 21.1 0 1.7 2.6 1.8 40 1.8s40-.1 40-1.8c0-5.2-2.4-15.5-4.9-20.7-2.7-5.9-11.7-16.6-17-20.4-2.6-1.9-2.8-1.9-8.1-.1-8.1 2.8-14.8 2.4-24.3-1.5-1.3-.5-3.6 1.2-9.7 7.3z" />
        </svg>
      </button>
    </div>
  );
}

export default Balance;

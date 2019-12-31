import React from "react";
import { TABS } from "../App";
import "./Header.css";

function Header({ activeTab, setActiveTab }) {
  return (
    <nav className="Header-container">
      <ul className="Header-tabs">
        <li
          className={`Header-tab${
            activeTab === TABS.MONEY ? " Header-tab--active" : ""
          }`}
        >
          <button
            className="Header-tab-button"
            onClick={e => {
              e.preventDefault();
              setActiveTab(TABS.MONEY);
            }}
          >
            Money
          </button>
        </li>
        <li
          className={`Header-tab${
            activeTab === TABS.LEAVE ? " Header-tab--active" : ""
          }`}
        >
          <button
            className="Header-tab-button"
            onClick={e => {
              e.preventDefault();
              setActiveTab(TABS.LEAVE);
            }}
          >
            Leave
          </button>
        </li>
        <li
          className={`Header-tab${
            activeTab === TABS.PROFILE ? " Header-tab--active" : ""
          }`}
        >
          <button
            className="Header-tab-button"
            onClick={e => {
              e.preventDefault();
              setActiveTab(TABS.PROFILE);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M5 5.002A5.005 5.005 0 0110 0c2.761 0 5 2.229 5 5.002v1.996A5.005 5.005 0 0110 12c-2.761 0-5-2.229-5-5.002V5.002zM0 16.676A19.908 19.908 0 0110 14c3.643 0 7.058.974 10 2.676V20H0v-3.324z"
                fill="#999"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Header;

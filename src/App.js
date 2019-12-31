import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import Header from "./Header/Header";
import Login from "./Login/Login";
import Message from "./Message/Message";
import MoneyTabContent from "./Money/MoneyTabContent/MoneyTabContent";
import LeaveTabContent from "./Leave/LeaveTabContent/LeaveTabContent";
import ProfileTabContent from "./Profile/ProfileTabContent/ProfileTabContent";
import { getMessage } from "./helpers";
import "./App.css";

const app = firebase.initializeApp(
  process.env.NODE_ENV === "production"
    ? {
        apiKey: "AIzaSyAvz5taK0m48RrfSQxrELm02swca9XQkus",
        authDomain: "two-masters-iou.firebaseapp.com",
        databaseURL: "https://two-masters-iou.firebaseio.com",
        projectId: "two-masters-iou",
        storageBucket: "two-masters-iou.appspot.com",
        messagingSenderId: "1014946364500",
        appId: "1:1014946364500:web:4497fcc4cebc25f06741c1"
      }
    : {
        apiKey: "AIzaSyBDC5ysToSJhtyRhq7WkCYBeLGAw8wOz0U",
        authDomain: "test-two-masters-iou.firebaseapp.com",
        databaseURL: "https://test-two-masters-iou.firebaseio.com",
        projectId: "test-two-masters-iou",
        storageBucket: "test-two-masters-iou.appspot.com",
        messagingSenderId: "668486184987",
        appId: "1:668486184987:web:4a57c55f42913e8c8688be"
      }
);

export const AppContext = React.createContext();

export const TABS = {
  MONEY: "MONEY",
  LEAVE: "LEAVE",
  PROFILE: "PROFILE"
};

function App() {
  const [userData, setUserData] = useState({
    isLoading: true,
    user: null
  });
  const { isLoading, user } = userData;
  const [activeTab, setActiveTab] = useState(TABS.MONEY);
  const message = getMessage();

  useEffect(() => {
    app.auth().onAuthStateChanged(user => {
      setUserData({
        isLoading: false,
        user // will be null when logged out
      });
    });
  }, []);

  return (
    <AppContext.Provider value={app}>
      <div className="App-container">
        {isLoading ? (
          <div className="App-loading">Loading...</div>
        ) : user ? (
          <>
            <header>
              {message && <Message message={message} />}
              <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            </header>
            <main>
              {activeTab === TABS.MONEY && <MoneyTabContent />}
              {activeTab === TABS.LEAVE && <LeaveTabContent />}
              {activeTab === TABS.PROFILE && <ProfileTabContent user={user} />}
            </main>
          </>
        ) : (
          <Login />
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;

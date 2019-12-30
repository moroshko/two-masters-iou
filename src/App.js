import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import Login from "./Login/Login";
import Logout from "./Logout/Logout";
import Message from "./Message/Message";
import Balance from "./Balance/Balance";
import NewRecord from "./NewRecord/NewRecord";
import Records from "./Records/Records";
import { getMessage } from "./helpers";
import "./App.css";

// const app = firebase.initializeApp({
//   apiKey: "AIzaSyAvz5taK0m48RrfSQxrELm02swca9XQkus",
//   authDomain: "two-masters-iou.firebaseapp.com",
//   databaseURL: "https://two-masters-iou.firebaseio.com",
//   projectId: "two-masters-iou",
//   storageBucket: "two-masters-iou.appspot.com",
//   messagingSenderId: "1014946364500",
//   appId: "1:1014946364500:web:4497fcc4cebc25f06741c1"
// });

const app = firebase.initializeApp({
  apiKey: "AIzaSyBDC5ysToSJhtyRhq7WkCYBeLGAw8wOz0U",
  authDomain: "test-two-masters-iou.firebaseapp.com",
  databaseURL: "https://test-two-masters-iou.firebaseio.com",
  projectId: "test-two-masters-iou",
  storageBucket: "test-two-masters-iou.appspot.com",
  messagingSenderId: "668486184987",
  appId: "1:668486184987:web:4a57c55f42913e8c8688be"
});

export const AppContext = React.createContext();

function App() {
  const [userData, setUserData] = useState({
    isLoading: true,
    user: null
  });
  const { isLoading, user } = userData;
  const [isLogoutCollapsed, setIsLogoutCollapsed] = useState(true);
  const [newRecordId, setNewRecordId] = useState(null);
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
          <div>
            <Logout isCollapsed={isLogoutCollapsed} email={user.email} />
            {message && <Message message={message} />}
            <Balance
              isLogoutCollapsed={isLogoutCollapsed}
              onProfileIconClick={() => {
                setIsLogoutCollapsed(!isLogoutCollapsed);
              }}
            />
            <NewRecord
              onSuccess={newRecordId => {
                setNewRecordId(newRecordId);

                setTimeout(() => {
                  setNewRecordId(null);
                }, 3000);
              }}
            />
            <Records newRecordId={newRecordId} />
          </div>
        ) : (
          <Login />
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;

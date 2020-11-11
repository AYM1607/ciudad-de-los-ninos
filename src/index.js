import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyD9L_NZwSg7bP0glGZtUZqvCJ_cuMEyQRo",
  authDomain: "ciudad-de-los-ninos.firebaseapp.com",
  databaseURL: "https://ciudad-de-los-ninos.firebaseio.com",
  projectId: "ciudad-de-los-ninos",
  storageBucket: "ciudad-de-los-ninos.appspot.com",
  messagingSenderId: "999883307627",
  appId: "1:999883307627:web:2923b482fdabd29b100f2e",
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

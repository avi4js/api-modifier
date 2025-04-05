import React, { useState } from "react";
import "./App.css";
import Query from "./components/query";
import Response from "./components/response";
import {
  disableInterceptor,
  enableInterceptor,
  validateResponseContent,
} from "./helper";

function App() {
  const [userQuery, setUserQuery] = useState<string>("");
  const [responseContent, setResponseContent] = useState<any>();
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [isEnable, setIsEnable] = useState<boolean>(false);

  const handleValidate = () => {
    if (validateResponseContent(responseContent)) {
      setError("");
      setMessage("Congratulation!!, you have provided correct JSON response.");
    } else {
      setError(
        "There is error in your response json content. Please correct and resubmit."
      );
      setMessage("");
    }
  };

  const handleEnable = () => {
    setIsEnable(true);
    if (!userQuery) {
      setError("Please provide the query.");
      setMessage("");
    }
    if (validateResponseContent(responseContent)) {
      if (enableInterceptor(userQuery, responseContent)) {
        setMessage(`Your Query ${userQuery} interceptor is Active now.`);
      } else {
        setMessage("Something went wrong, Please try again");
      }
    } else {
      setError(
        "There is error in your response json content. Please correct and resubmit."
      );
    }
  };

  const handleDisable = () => {
    // const payload = { query: "avinash" };
    // var xhr = new XMLHttpRequest();
    // xhr.open(
    //   "GET",
    //   "http://api.openweathermap.org/data/2.5/weather?q=London&mode=json",
    //   true
    // );
    // //xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.onload = function (e) {
    //   if (xhr.readyState === 4) {
    //     if (xhr.status === 401) {
    //       console.log(xhr.responseText);
    //       var response = xhr.responseText ? JSON.parse(xhr.responseText) : "";
    //       console.log("valte" + response);
    //     } else {
    //       console.error(xhr.statusText);
    //     }
    //   }
    // };
    // xhr.onerror = function (e) {
    //   console.error(xhr.statusText);
    // };
    // xhr.send();
    // setIsEnable(false);
    // if (disableInterceptor(userQuery)) {
    //   setMessage(`Your Query ${userQuery} interceptor is Disabled now.`);
    // } else {
    //   setMessage("Something went wrong, Please try again");
    // }
  };

  return (
    <div className="main">
      <h3 className="header">API mocker1</h3>
      <Query onQueryChange={setUserQuery} currentQuery={userQuery} />
      <Response
        onResponseChange={setResponseContent}
        currentResponseContent={responseContent}
      />
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
      <div className="actions">
        <button onClick={handleValidate} className="validate-btn">
          Validate
        </button>
        <button
          onClick={handleEnable}
          disabled={isEnable}
          className="enable-btn">
          Enable
        </button>
        <button
          onClick={handleDisable}
          disabled={!isEnable}
          className="disable-btn">
          Disable
        </button>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");

if (container !== null) {
  const root = ReactDOM.createRoot(container); // createRoot 호출 시 container를 넘겨줍니다.
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("The root container was not found");
}

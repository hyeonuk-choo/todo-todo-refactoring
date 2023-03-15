import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// 컴포넌트
import App from "./App";
import GlobalStyle from "./style/GlobalStyle";
import { store } from "./redux/config/configStore";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

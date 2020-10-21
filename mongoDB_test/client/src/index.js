import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/index";

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};

// hoc auth를 사용하려면 subscribe 사용 X
// store.subscribe(render);
render();

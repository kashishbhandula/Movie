import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";

import "./index.css";
import App from "./components/App";
import rootReducer from "./reducers";

const logger = function ({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      // middleware code
      console.log("ACTION_TYPE=", action.type);
      next(action);
    };
  };
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
//  console.log("Before store ", store.getState());
//  store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{name:'Superman'}]
//  })

//  console.log("After store ", store.getState());
// console.log("hello");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);

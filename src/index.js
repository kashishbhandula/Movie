import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";

import "./index.css";
import App from "./components/App";
import rootReducer from "./reducers";

// const logger = function ({ dispatch, getState }) {
//   return function (next) {
//     return function (action) {
//       // middleware code
//       console.log("ACTION_TYPE=", action.type);
//       next(action);
//     };
//   };
// };
const logger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log("ACTION_TYPE=", action.type);
    next(action);
  };
const thunk =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      action(dispatch);
      return;
    }
    next(action);
  };

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, thunk),
});
//  console.log("Before store ", store.getState());
//  store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{name:'Superman'}]
//  })

//  console.log("After store ", store.getState());
// console.log("hello");

const root = ReactDOM.createRoot(document.getElementById("root"));
export const StoreContext = createContext();
// console.log('StoreContext');
class Provider extends React.Component {
  render() {
    return (
      <StoreContext.Provider value={this.props.store}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}
export function connect(callback) {
  return function (Component) {
    class ConnectedComponent extends React.Component {
      constructor(props) {
        super(props);
        this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        const {store} = this.props;
        const state = store.getState();
        const dataToBePassesAsProps = callback(state);
        return (
          <Component {...dataToBePassesAsProps} dispatch={store.dispatch} />
        );
      }
    }
    class ConnectedComponentWrapper extends React.Component {
      render() {
        return (
          <StoreContext.Consumer>
            {(store) => <ConnectedComponent store={store} />}
          </StoreContext.Consumer>
        );
      }
    }
    return ConnectedComponentWrapper;
  };
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

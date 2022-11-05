import React from "react";
import ReactDOM from "react-dom/client";

import store from "./store/store";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Router from "./toplevel/Router";
import Wrapper from "./toplevel/Wrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Wrapper>
      <Router />
    </Wrapper>
  </Provider>
);

// TODO: bringing it all together

//intro text

// TODO: Future stuff

// add in not found page, error redirects, and no items found messages, api errors
// cookie popup
// newsletter popup
// add login logout functionality
// make overiview page + search + pagination + store in querySlice
// upgrade redux to saga
// replace componets that use stake with a placeholder until loaded
// maybe store masonry stake info in store -> on page return the height will then be kept

// Ideas
// have a webscoket instead of the recurring user api call

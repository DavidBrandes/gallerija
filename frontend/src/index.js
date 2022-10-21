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

// TODO: general functionalities

// Bring back Artist + Info Card

// check that potential undefined stake, item and user values are handled correctly
// all values passed as props fit, biddingStarted Values are placed correctly
// check if everything rerenders as often and as much as it should
// check stake and item rerenders when the component is just replaced (e.g in detail page)

// TODO: bringing it all together

// add image description

// make menu
// make footer

// finetune design
// make responsive

// test, remove logs, warnings, deploy, unused css classes, imports

// TODO: Future stuff

// cookie popup
// newsletter popup
// add login logout functionality
// make overiview page + search + pagination + store in querySlice
// add in not found page, error redirects, and no items found messages
// upgrade redux to saga

// Ideas
// have a webscoket instead of the recurring user api call

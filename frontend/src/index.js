import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store/store";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Router from "./Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router />
  </Provider>
);

// TODO: general functionalities

// make time component that displays the current bid time + updates api data

// load initial user slice data from api
// make a timer slice that then connects to the time module

// do a you win component that updates on a finished bid
// display you win /loose in cards

// Bring back Artist + Info Card
// remove has more
// store related query in store
// check that grid wont be completely reloaded on id change (rn it stays on screen till reset)

// TODO: bringing it all together

// check that potential undefined stake, item and user values are handles correctly
// all values passed as props fit, biddingStarted Values are placed correctly
// check if everything rerenders as often and as much as it should
// check stake and item rerenders when the component is just replaced (e.g in detail page)

// Not found page + add redirects on error

// make menu
// make footer

// make responsive
// finetune design

// add/redo data
// test, remove logs, warnings

// TODO: Future stuff

// cookie popup
// newsletter popup
// add login logout functionality
// make overiview page + search + pagination + store in querySlice

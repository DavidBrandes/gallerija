import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { setTime } from "../store/modules/timeSlice";
import { setUser } from "../store/modules/userSlice";
import { setWin } from "../store/modules/winSlice";

import userData from "../api/user";

import store from "../store/store";

import { checkNewWin } from "../utility/win";

function Wrapper(props) {
  const dispatch = useDispatch();
  const timerUpdateInterval = Number(
    process.env.REACT_APP_TIME_UPDATE_INTERVAL
  );
  const userUpdateInterval = Number(process.env.REACT_APP_USER_UPDATE_INTERVAL);

  console.log("wrapper render");

  async function load(first) {
    console.log("user api call");
    try {
      const response = await userData.getUser();

      if (first) dispatch(setUser({ state: response }));
      else {
        const newWin = checkNewWin(response.won, store.getState().user.won);
        dispatch(
          setUser({ state: { won: response.won, stakes: response.stakes } })
        );
        if (newWin) dispatch(setWin(newWin));
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // time startup
    let timeInterval;
    if (Number.isFinite(timerUpdateInterval))
      timeInterval = setInterval(() => {
        console.log("timer reset");

        dispatch(setTime({ time: new Date().getTime() }));
      }, timerUpdateInterval);

    // initial user call
    load(true);
    let userInterval;
    if (Number.isFinite(userUpdateInterval))
      userInterval = setInterval(() => {
        load(false);
      }, userUpdateInterval);

    return () => {
      clearInterval(timeInterval);
      clearInterval(userInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{props.children}</div>;
}

export default Wrapper;

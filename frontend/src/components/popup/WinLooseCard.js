import classes from "./css/WinLooseCard.module.css";
import Link from "../utils/Link";
import Overlay from "../utils/Overlay";
import { useRef, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { updateShowed } from "../../store/modules/winSlice";

import store from "../../store/store";

import itemData from "../../api/item";

function WinLooseCardWrapper() {
  const ref = useRef(null);
  const [item, setItem] = useState({});
  const win = useSelector((state) => state.win.win);
  const dispatch = useDispatch();

  console.log("wind loose render");

  async function openWinLooseCard() {
    try {
      const { item } = await itemData.getItem({ id: win.id });
      setItem(item);
      if (!ref.current.showOverlay) ref.current.showClick(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(
      "open win card",
      win.id,
      ref.current.showOverlay,
      store.getState().overlay.open
    );
    if (
      win.id !== undefined &&
      !ref.current.showOverlay &&
      !win.showed &&
      process.env.REACT_APP_SHOW_WIN_POPUP === "true"
    )
      openWinLooseCard();

    dispatch(updateShowed());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win]);

  return (
    <Overlay ref={ref} zValue={4}>
      <WinLooseCard item={item} won={win.won} />
    </Overlay>
  );
}

function WinLooseCard(props) {
  return (
    <div className={classes.container}>
      <h2>{props.item.title}</h2>
      <h3>{props.won ? "You won!" : "You lost.."}</h3>
      <Link to={`/detail/${props.item.id}`} state={{ item: props.item }}>
        <button
          className={classes.button}
          onClick={() => props.showClick(false)}
        >{`View Painting`}</button>
      </Link>
    </div>
  );
}

export default WinLooseCardWrapper;

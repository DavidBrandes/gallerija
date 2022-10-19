import classes from "./css/WinLooseCard.module.css";
import Link from "../utils/Link";
import Overlay from "../utils/Overlay";
import { useRef, useEffect, useState } from "react";

import { useSelector } from "react-redux";

import store from "../../store/store";

import itemData from "../../api/item";

function WinLooseCardWrapper(props) {
  const ref = useRef(null);
  const [item, setItem] = useState({});
  const win = useSelector((state) => state.win.win);

  async function openWinLooseCard() {
    try {
      const { item } = await itemData.getItem({ id: win.id });
      setItem(item);
      if (!store.getState().overlay.open && !ref.current.showOverlay)
        ref.current.showClick(true);
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
      !store.getState().overlay.open &&
      !ref.current.showOverlay
    )
      openWinLooseCard();
  }, [win]);

  return (
    <Overlay ref={ref} zValue={6}>
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

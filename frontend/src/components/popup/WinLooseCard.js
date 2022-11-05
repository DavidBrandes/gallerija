import classes from "./css/WinLooseCard.module.css";
import Link from "../utils/Link";
import Overlay from "../utils/Overlay";
import Title from "../cardparts/title/Title";
import ViewButton from "../cardparts/view/ViewButton";
import { useRef, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { updateShowed } from "../../store/modules/winSlice";
import { TbArrowForwardUp } from "react-icons/tb";

import store from "../../store/store";

import itemData from "../../api/item";

function WinLooseCardWrapper() {
  const ref = useRef(null);
  const itemRef = useRef();
  const interval = useRef();
  const win = useSelector((state) => state.win.win);
  const dispatch = useDispatch();

  console.log("win loose render");

  function open() {
    if (itemRef.current && !store.getState().overlay.open) {
      clearInterval(interval.current);
      dispatch(updateShowed());
      ref.current.showClick(true);
    }
  }

  async function loadItem() {
    try {
      const { item } = await itemData.getItem({ id: win.id });
      itemRef.current = item;
      interval.current = setInterval(
        () => open(),
        Number(process.env.REACT_APP_WIN_POPUP_INTERVAL)
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (
      win.id !== undefined &&
      !win.showed &&
      process.env.REACT_APP_SHOW_WIN_POPUP === "true"
    ) {
      loadItem();

      return () => clearInterval(interval.current);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win]);

  return (
    <Overlay ref={ref} zValue={4} overlayClass={classes.overlayContainer}>
      <WinLooseCard item={itemRef.current} won={win.won} />
    </Overlay>
  );
}

function WinLooseCard(props) {
  const message = props.won
    ? "Congratulations! You won the bid for a painting."
    : "Oh no, you lost the bid for a painting... Maybe try your luck wth another one.";

  return (
    <div className={classes.container}>
      <TbArrowForwardUp
        className={classes.close}
        onClick={() => props.showClick(false)}
      />

      <Title
        item={props.item}
        containerClass={classes.titleContainer}
        titleClass={classes.title}
        subTitleClass={classes.subTitle}
      />
      <p className={classes.text}>{message}</p>
      <div onClick={() => props.showClick(false)}>
        <ViewButton
          item={props.item}
          index={props.index}
          containerClass={classes.buttonContainer}
          textClass={classes.buttonText}
        ></ViewButton>
      </div>
    </div>
  );
}

export default WinLooseCardWrapper;

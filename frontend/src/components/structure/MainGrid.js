import classes from "./css/MainGrid.module.css";
import Masonry from "react-masonry-css";
import MainPageCard from "../card/MainPageCard";
import data from "../../api/data";

import store from "../../store/store";

import { useDispatch } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { updatePage, deletePage } from "../../store/modules/itemsSlice";

function MainGrid(props) {
  const breakpointColumnsObj = {
    default: 2,
    700: 1,
  };
  const page = 0;
  const lastVisibleIndex = 1;
  const itemsPerLoad = 4;
  const itemsPerPage = 8;
  const loadOffset = 1;

  //TODO: export global variables
  //TODO: display currently viewed items in Address and move there on call
  //TODO: delete old visited pages from store?
  //TODO: make pagination
  //TODO: make callbacks out of the functions below?
  //TODO: view restoration on back click

  const dispatch = useDispatch();
  const [gridList, setGridList] = useState([]);

  console.log("render");

  function add(items, currentIndex) {
    const lastVisibleIndex = store.getState().items[page].lastVisibleIndex;

    const newGridItems = items.map((item, index) => {
      index = index + currentIndex;
      return (
        <MainPageCard
          item={item}
          key={index}
          index={index}
          wasInView={index <= lastVisibleIndex}
          callback={callback}
        />
      );
    });
    setGridList((currentGridList) => currentGridList.concat(newGridItems));
  }

  function load() {
    const currentIndex = store.getState().items[page].items.length;

    const { items, hasMore } = data.getItems(
      currentIndex,
      Math.min(currentIndex + itemsPerLoad, itemsPerPage)
    );

    dispatch(updatePage({ page, hasMore, items }));
    add(items, currentIndex);
  }

  function callback(index, inView) {
    console.log("callback", index, inView);
    if (inView && index > store.getState().items[page].lastVisibleIndex) {
      dispatch(updatePage({ page, lastVisibleIndex: index }));
      if (
        index + loadOffset >= store.getState().items[page].items.length &&
        store.getState().items[page].hasMore
      ) {
        load();
      }
    }
  }

  useEffect(() => {
    // remove old pages from store
    //dispatch(deletePage({page}))

    if (store.getState().items[page] === undefined) {
      dispatch(updatePage({ page, lastVisibleIndex }));
      load();
    } else {
      add(store.getState().items[page].items, 0);
    }
  }, []);

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={classes.container}
      columnClassName={classes.column}
    >
      {gridList}
    </Masonry>
  );
}

export default MainGrid;

import classes from "./css/Masonry.module.css";
import MasonryCSS from "react-masonry-css";
import MasonryCard from "../card/MasonryCard";
import itemData from "../../api/item";
import { InView } from "react-intersection-observer";

import { setSearch } from "../../utility/location";

import store from "../../store/store";

import { useDispatch } from "react-redux";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { updateQuery } from "../../store/modules/querySlice";

function MasonryCardWrapper(props) {
  const newLoadMargin = Number(process.env.REACT_APP_MASONRY_IN_VIEW_MARGIN);
  const [componentInView, setComponentInView] = useState(false);
  const wasInView = useRef(props.wasInView);
  const scrollRef = useRef(null);

  console.log(
    "rendered card",
    props.index,
    "Was in view",
    wasInView.current,
    "currently in view",
    componentInView
  );

  useEffect(() => {
    if (scrollRef.current && props.scrollTo) {
      console.log("scroll", props.index);
      scrollRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, []);

  return (
    <InView
      onChange={(inView) => {
        if (inView && !wasInView.current) {
          wasInView.current = true;
        }
        setComponentInView(inView);
        props.callback(props.index, inView);
      }}
      rootMargin={`${newLoadMargin}px 0px ${newLoadMargin}px 0px`}
    >
      <div ref={props.scrollTo ? scrollRef : null}>
        <MasonryCard
          item={props.item}
          index={props.index}
          inView={componentInView}
          show={wasInView.current || componentInView}
        ></MasonryCard>
      </div>
    </InView>
  );
}

function MasonryWrapper() {
  //we could try to predict on the initial load which items will be on the screen,
  //such that they wont rerender for a isVisible false -> true change, however the
  //resulting speedup is probably not worth the additional prediction

  console.log("Masonry Wrapper render");

  // get the query parameters
  const search = new URLSearchParams(window.location.search);
  const n =
    search.get("n") === undefined ? Infinity : Number(search.get("n")) - 1;

  // update the currently viewed item in the url
  const viewedItemCallback = useCallback((n) => {
    console.log("viewed item callback", n);

    if (Number.isFinite(n)) setSearch({ n: n + 1 });
  }, []);

  return (
    <div>
      <Masonry viewedItemCallback={viewedItemCallback} scrollToIndex={n} />
    </div>
  );
}

const Masonry = React.memo(function Masonry(props) {
  const itemsPerQuery = Number(process.env.REACT_APP_MASONRY_ITEMS_PER_QUERY);
  const maxItems = Number(process.env.REACT_APP_MASONRY_MAX_ITEMS);
  const loadOffset = Number(process.env.REACT_APP_MASONRY_NEW_LOAD_OFFSET);

  const dispatch = useDispatch();
  const [gridList, setGridList] = useState([]);
  const inViewSet = useRef(new Set());

  console.log("Masonry render");

  function add(items, currentIndex) {
    const lastVisibleIndex = store.getState().query.main.lastVisibleIndex;

    const newGridItems = items.map((item, index) => {
      index = index + currentIndex;

      return (
        <MasonryCardWrapper
          item={item}
          key={index}
          index={index}
          wasInView={index <= lastVisibleIndex}
          callback={callback}
          scrollTo={
            index === props.scrollToIndex &&
            props.scrollToIndex <= lastVisibleIndex
          }
        />
      );
    });

    setGridList((currentGridList) => currentGridList.concat(newGridItems));
  }

  async function load() {
    const index = store.getState().query.main.items.length;

    try {
      const { items, hasMore } = await itemData.getItems({
        index: index,
        nItems: itemsPerQuery,
        maxItems,
      });

      dispatch(updateQuery({ hasMore, items }));
      add(items, index);
    } catch (error) {
      console.error(error);
    }
  }

  function callback(index, inView) {
    console.log("callback", index, "in view", inView);

    inView ? inViewSet.current.add(index) : inViewSet.current.delete(index);

    if (inView && index > store.getState().query.main.lastVisibleIndex) {
      dispatch(updateQuery({ lastVisibleIndex: index }));

      const nItems = store.getState().query.main.items.length;

      if (
        index + loadOffset >= nItems &&
        store.getState().query.main.hasMore &&
        nItems < maxItems
      ) {
        load();
      }
    }

    props.viewedItemCallback(Math.min(...inViewSet.current));
  }

  useEffect(() => {
    console.log("initial masonry call");

    if (store.getState().query.main.items.length === 0) load();
    else {
      add(store.getState().query.main.items, 0);
    }
  }, []);

  return (
    <div>
      {gridList.length ? (
        <MasonryCSS
          breakpointCols={{
            default:
              window.innerWidth <= 640 ? 1 : window.innerWidth <= 1040 ? 2 : 3,
            640: 1,
            1040: 2,
            100000: 3,
          }}
          className={classes.container}
          columnClassName={classes.column}
        >
          {gridList}
        </MasonryCSS>
      ) : (
        <div className={classes.placeholder}></div>
      )}
    </div>
  );
});

export default MasonryWrapper;

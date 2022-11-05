import classes from "./css/Masonry.module.css";
import MasonryCSS from "react-masonry-css";
import MasonryCard from "./MasonryCard";
import InfoCard from "./InfoCard";
import ArtistCard from "./ArtistCard";
import itemData from "../../../api/item";
import { InView } from "react-intersection-observer";

import { setSearch } from "../../../utility/location";

import store from "../../../store/store";

import { useDispatch } from "react-redux";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { updateMain } from "../../../store/modules/querySlice";

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
      const timeout = setTimeout(() => {
        scrollRef.current.scrollIntoView({ behavior: "instant" });
      }, Number(process.env.REACT_APP_SCROLL_RESTORE_TIMEOUT));

      return () => clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {wasInView.current || componentInView ? (
        <div ref={props.scrollTo ? scrollRef : null}>
          {props.type === "item" ? (
            <MasonryCard
              item={props.item}
              id={props.item.id}
              index={props.index}
              inView={componentInView}
              show={wasInView.current || componentInView}
              delay={props.delay}
            ></MasonryCard>
          ) : props.type === "artists" ? (
            <ArtistCard artists={props.artists} />
          ) : props.type === "info" ? (
            <InfoCard />
          ) : null}
        </div>
      ) : (
        <div className={classes.cardPlaceholder}></div>
      )}
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
  const n = search.get("n") === null ? undefined : Number(search.get("n")) - 1;

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

function Masonry(props) {
  const itemsPerQuery = Number(process.env.REACT_APP_MASONRY_ITEMS_PER_QUERY);
  const loadOffset = Number(process.env.REACT_APP_MASONRY_NEW_LOAD_OFFSET);

  const infoCardIndex = Number(process.env.REACT_APP_MASONRY_INFO_CARD_INDEX);
  const artistCardIndex = Number(
    process.env.REACT_APP_MASONRY_ARTISTS_CARS_INDEX
  );

  const dispatch = useDispatch();
  const [gridList, setGridList] = useState([]);
  const inViewSet = useRef(new Set());
  const scrollToIndex = useRef(props.scrollToIndex);

  console.log("Masonry render", props.scrollToIndex);

  function add(items, currentIndex) {
    const lastVisibleIndex = store.getState().query.main.lastVisibleIndex;
    const scrollToValid = scrollToIndex.current <= lastVisibleIndex;

    const newGridItems = [];
    let index = currentIndex;
    for (const item of items) {
      let scrollTo = index === props.scrollToIndex;

      console.log("abc", index, props.scrollToIndex);

      if (index === artistCardIndex) {
        newGridItems.push(
          <MasonryCardWrapper
            type={"artists"}
            key={index}
            index={index}
            wasInView={index <= lastVisibleIndex}
            callback={callback}
            scrollTo={scrollTo && scrollToValid}
            artists={store.getState().query.main.artists}
          />
        );

        index++;
        scrollTo = index === props.scrollToIndex;
      }

      if (index === infoCardIndex) {
        newGridItems.push(
          <MasonryCardWrapper
            type={"info"}
            key={index}
            index={index}
            wasInView={index <= lastVisibleIndex}
            callback={callback}
            scrollTo={scrollTo && scrollToValid}
          />
        );

        index++;
        scrollTo = index === props.scrollToIndex;
      }

      newGridItems.push(
        <MasonryCardWrapper
          type={"item"}
          item={item}
          key={index}
          index={index}
          wasInView={index <= lastVisibleIndex}
          callback={callback}
          scrollTo={scrollTo && scrollToValid}
          delay={scrollToValid && !scrollTo}
        />
      );

      index++;
    }

    scrollToIndex.current = undefined;

    setGridList((currentGridList) => currentGridList.concat(newGridItems));
  }

  async function load(startIndex, startIndexWithExtraCards, first) {
    console.log("item load", startIndex, startIndexWithExtraCards, first);
    try {
      if (first) {
        const [{ items, numberItems }, { artists }] = await Promise.all([
          itemData.getItems({
            startIndex,
            stopIndex: startIndex + itemsPerQuery,
            getNumberItems: first,
          }),
          itemData.getArtists(),
        ]);

        dispatch(
          updateMain({
            numberItems: Math.min(
              numberItems,
              Number(process.env.REACT_APP_MASONRY_MAX_ITEMS)
            ),
            items,
            artists,
          })
        );
        add(items, startIndexWithExtraCards);
      } else {
        const { items } = await itemData.getItems({
          startIndex,
          stopIndex: Math.min(
            startIndex + itemsPerQuery,
            store.getState().query.main.numberItems
          ),
          getNumberItems: false,
        });

        dispatch(updateMain({ items }));
        add(items, startIndexWithExtraCards);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function callback(index, inView) {
    console.log("callback", index, "in view", inView);

    inView ? inViewSet.current.add(index) : inViewSet.current.delete(index);
    props.viewedItemCallback(Math.min(...inViewSet.current));

    if (inView && index > store.getState().query.main.lastVisibleIndex) {
      dispatch(updateMain({ lastVisibleIndex: index }));

      const startIndex = store.getState().query.main.items.length;
      let startIndexWithExtraCards = startIndex;
      if (index >= artistCardIndex) startIndexWithExtraCards++;
      if (index >= infoCardIndex) startIndexWithExtraCards++;

      if (
        index + loadOffset >= startIndexWithExtraCards &&
        startIndex < store.getState().query.main.numberItems
      )
        load(startIndex, startIndexWithExtraCards, false);
    }
  }

  useEffect(() => {
    console.log("initial masonry call");
    if (store.getState().query.main.items.length === 0) load(0, 0, true);
    else {
      add(store.getState().query.main.items, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {gridList.length ? (
        <MasonryCSS
          breakpointCols={{
            default:
              window.innerWidth <= 800 ? 1 : window.innerWidth <= 1520 ? 2 : 3,
            800: 1,
            1520: 2,
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
}

export default MasonryWrapper;

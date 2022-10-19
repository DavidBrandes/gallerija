import classes from "./css/Grid.module.css";

import GridCard from "../card/GridCard";

import React, { useState, useRef, useEffect } from "react";
import { InView } from "react-intersection-observer";

const Placeholder = React.memo((props) => {
  const maxItems = Number(process.env.REACT_APP_GRID_ITEMS_PER_BLOCK);

  //to make it fully precise we would need to round the columns in css
  //what is not possible, so ceil(items / rows)

  const items =
    Math.max(0, props.pageHeight - 1) * maxItems +
    Math.min(1, props.pageHeight) * props.lastPageItems;

  return (
    <div
      className={classes.placeholder}
      style={{ "--items": `${items}` }}
    ></div>
  );
});

function GridCardWrapper(props) {
  const inViewMargin = Number(process.env.REACT_APP_GRID_IN_VIEW_MARGIN);
  const [componentInView, setComponentInView] = useState(false);
  const scrollRef = useRef(null);

  console.log(
    "rendered grid card",
    props.index,
    "currently in view",
    componentInView
  );

  useEffect(() => {
    if (scrollRef.current) {
      console.log("scroll", props.index);
      scrollRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, []);

  return (
    <InView
      onChange={(inView) => {
        setComponentInView(inView);
        props.callback(props.index, inView);
      }}
      rootMargin={`${inViewMargin}px 0px ${inViewMargin}px 0px`}
    >
      <div ref={props.scrollTo ? scrollRef : null} className={classes.card}>
        {componentInView ? (
          <GridCard
            item={props.item}
            index={props.index}
            inView={componentInView}
          ></GridCard>
        ) : (
          <div className={classes.cardPlaceholder}></div>
        )}
      </div>
    </InView>
  );
}

function GridBlock(props) {
  const itemsPerBlock = Number(process.env.REACT_APP_GRID_ITEMS_PER_BLOCK);

  const startIndex = itemsPerBlock * props.page;

  const [blockItems, setBlockItems] = useState([]);

  const inViewSet = useRef(new Set());
  const blockHasMore = useRef(true);
  const nItems = useRef(0);

  console.log("rendered grid block", props.page);

  function callback(index, inView) {
    inView ? inViewSet.current.add(index) : inViewSet.current.delete(index);

    const minInViewIndex = Math.min(...inViewSet.current);
    const blockInView = Number.isFinite(minInViewIndex);

    props.callback(
      props.page,
      minInViewIndex,
      blockInView,
      blockHasMore.current,
      nItems.current
    );
  }

  async function add() {
    try {
      let { items, hasMore } = await props.load({
        index: startIndex,
        nItems: itemsPerBlock,
      });

      nItems.current = items.length;
      blockHasMore.current = hasMore;

      items = items.map((item, index) => {
        index = index + startIndex;

        return (
          <GridCardWrapper
            index={index}
            key={index}
            item={item}
            scrollTo={index === props.scrollToIndex}
            callback={callback}
          ></GridCardWrapper>
        );
      });

      if (nItems.current === 0) new Error("nothing to load");
      setBlockItems(items);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    add();
  }, [props.load]);

  return (
    <div className={classes.grid}>
      {blockItems.length ? (
        blockItems
      ) : (
        <Placeholder pageHeight={1} lastPageItems={itemsPerBlock}></Placeholder>
      )}
    </div>
  );
}

function Grid(props) {
  //props: page; n; callback; load
  const pageOffset = Number(process.env.REACT_APP_GRID_BLOCK_OFFSET);
  const itemsPerBlock = Number(process.env.REACT_APP_GRID_ITEMS_PER_BLOCK);

  const [gridBlocks, setGridBlocks] = useState([]);
  const pagesInView = useRef([-Infinity, -Infinity]);
  const blockInViewDict = useRef({});
  const maxPage = useRef(-Infinity);
  const lastPageItems = useRef(0);

  console.log("rendered grid", "number grids", gridBlocks.length);

  function callback(page, index, inView, hasMore, nItems) {
    if (inView) {
      if (blockInViewDict.current[page] === undefined)
        blockInViewDict.current[page] = index;
      else blockInViewDict.current[page] = index;
    } else delete blockInViewDict.current[page];

    const pagesInView = Object.keys(blockInViewDict.current);

    if (pagesInView.length === 0) return;

    let minPageInView = Math.min(...pagesInView);
    let maxPageInView = Math.max(...pagesInView);

    if (props.callback) props.callback(blockInViewDict.current[minPageInView]);

    if (page >= maxPage.current) {
      if (hasMore) {
        maxPage.current = page + 1;
        lastPageItems.current = 0;
      } else {
        maxPage.current = page;
        lastPageItems.current = nItems;
      }
    }

    minPageInView = Math.max(0, minPageInView - pageOffset);
    maxPageInView = Math.min(maxPage.current, maxPageInView + 1);

    set(minPageInView, maxPageInView);
  }

  function set(minIndex, maxIndex, scrollToIndex) {
    if (
      minIndex !== pagesInView.current[0] ||
      maxIndex !== pagesInView.current[1]
    ) {
      setGridBlocks((currentGridBlocks) => {
        const preBlocks = [];
        for (
          let i = minIndex;
          i < Math.min(pagesInView.current[0], maxIndex + 1);
          i++
        ) {
          preBlocks.push(
            <GridBlock
              page={i}
              key={i}
              callback={callback}
              load={props.load}
              scrollToIndex={scrollToIndex}
            ></GridBlock>
          );
        }

        const centerBlocks = currentGridBlocks.slice(
          Math.max(minIndex - pagesInView.current[0], 0),
          Math.max(maxIndex - pagesInView.current[0] + 1, 0)
        );

        const afterBlocks = [];
        for (
          let i = Math.max(pagesInView.current[1] + 1, minIndex);
          i <= maxIndex;
          i++
        ) {
          afterBlocks.push(
            <GridBlock
              page={i}
              key={i}
              callback={callback}
              load={props.load}
              scrollToIndex={scrollToIndex}
            ></GridBlock>
          );
        }

        const newGridBlocks = preBlocks
          .concat(centerBlocks)
          .concat(afterBlocks);
        pagesInView.current = [minIndex, maxIndex];

        return newGridBlocks;
      });
    }
  }

  useEffect(() => {
    console.log("grid initial call");
    pagesInView.current = [-Infinity, -Infinity];
    blockInViewDict.current = {};
    maxPage.current = -Infinity;
    lastPageItems.current = 0;

    set(props.page ?? 0, props.page ?? 0, props.n);
  }, [props.load]);

  return (
    <div>
      <Placeholder
        pageHeight={pagesInView.current[0]}
        lastPageItems={itemsPerBlock}
      ></Placeholder>
      {gridBlocks}
      <Placeholder
        pageHeight={Math.max(0, maxPage.current - pagesInView.current[1])}
        lastPageItems={lastPageItems.current}
      ></Placeholder>
    </div>
  );
}

export default Grid;

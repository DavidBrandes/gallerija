import classes from "./css/Grid.module.css";

import GridCard from "./GridCard";

import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import { InView } from "react-intersection-observer";

function Placeholder(props) {
  const itemsPerBlock = Number(process.env.REACT_APP_GRID_ITEMS_PER_BLOCK);

  //to make it fully precise we would need to round the columns in css
  //what is not possible, so ceil(items / rows). Instead we always assume
  // the last block is completely full

  const items =
    Math.max(0, Number.isFinite(props.blockHeight) ? props.blockHeight : 0) *
    itemsPerBlock;

  console.log("placeholder render", items);

  return (
    <div
      className={classes.placeholder}
      style={{ "--items": `${items}` }}
    ></div>
  );
}

function GridCardWrapper(props) {
  const inViewMargin = Number(process.env.REACT_APP_GRID_IN_VIEW_MARGIN);
  const [componentInView, setComponentInView] = useState(false);
  const scrollRef = useRef(null);

  console.log(
    "rendered grid card wrapper",
    props.index,
    "currently in view",
    componentInView
  );

  useEffect(() => {
    if (scrollRef.current) {
      console.log("scroll", props.index);
      scrollRef.current.scrollIntoView({ behavior: "instant" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            id={props.item.id}
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

  const startIndex = itemsPerBlock * props.blockIndex;
  const stopIndex = startIndex + itemsPerBlock;

  const [blockItems, setBlockItems] = useState([]);
  const { loadBlock, setMaxBlockIndex, getBlock, setBlock } =
    useContext(GridContext);

  const inViewSet = useRef(new Set());

  console.log("rendered grid block", props.blockIndex);

  function callback(index, inView) {
    inView ? inViewSet.current.add(index) : inViewSet.current.delete(index);

    const minInViewIndex = Math.min(...inViewSet.current);
    const blockInView = Number.isFinite(minInViewIndex);

    props.callback(props.blockIndex, minInViewIndex, blockInView);
  }

  async function load() {
    try {
      let { items, numberItems } = await loadBlock({
        startIndex: startIndex,
        stopIndex: stopIndex,
        getNumberItems: props.first,
      });

      if (items.length === 0) throw new Error("nothing to load");

      if (props.first)
        setMaxBlockIndex({
          maxBlockIndex: Math.ceil(numberItems / itemsPerBlock) - 1,
        });

      add(items, true);
    } catch (error) {
      console.log(error);
    }
  }

  function add(items, dispatch) {
    const blockItems = items.map((item, index) => {
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
    if (dispatch) setBlock({ blockIndex: props.blockIndex, block: items });
    setBlockItems(blockItems);
  }

  useEffect(() => {
    const items = getBlock({ blockIndex: props.blockIndex });
    console.log(
      "initial grid block call",
      props.blockIndex,
      "load",
      items === undefined
    );
    if (items) add(items, false);
    else load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.grid}>
      {blockItems.length ? (
        blockItems
      ) : (
        <Placeholder blockHeight={1}></Placeholder>
      )}
    </div>
  );
}

function Grid(props) {
  const blockOffset = Number(process.env.REACT_APP_GRID_BLOCK_OFFSET);

  const {
    setLastVisibleBlockIndex,
    getLastVisibleBlockIndex,
    getMaxBlockIndex,
  } = useContext(GridContext);
  const [gridBlocks, setGridBlocks] = useState([]);
  const blocksInView = useRef([-Infinity, -Infinity]);
  const blockInViewDict = useRef({});

  let lastVisibleBlockIndex = getLastVisibleBlockIndex();

  console.log("rendered main grid", gridBlocks.length, blocksInView.current);

  function callback(blockIndex, itemIndex, inView) {
    if (inView) {
      blockInViewDict.current[blockIndex] = itemIndex;
    } else delete blockInViewDict.current[blockIndex];

    const currentBlocksInView = Object.keys(blockInViewDict.current);

    if (currentBlocksInView.length === 0) return;

    let minBlockInView = Math.min(...currentBlocksInView);
    let maxBlockInView = Math.max(...currentBlocksInView);

    if (props.callback) props.callback(blockInViewDict.current[minBlockInView]);

    if (blockIndex > lastVisibleBlockIndex) {
      setLastVisibleBlockIndex({ blockIndex });
      lastVisibleBlockIndex = blockIndex;
    }

    minBlockInView = Math.max(0, minBlockInView - blockOffset);
    maxBlockInView = Math.min(
      getMaxBlockIndex(),
      maxBlockInView + blockOffset,
      props.maxNumberBlocks
    );

    set(minBlockInView, maxBlockInView);
  }

  function set(minIndex, maxIndex, scrollToIndex, first) {
    if (
      minIndex !== blocksInView.current[0] ||
      maxIndex !== blocksInView.current[1]
    ) {
      setGridBlocks((currentGridBlocks) => {
        const preBlocks = [];
        for (
          let i = minIndex;
          i < Math.min(blocksInView.current[0], maxIndex + 1);
          i++
        ) {
          preBlocks.push(
            <GridBlock
              blockIndex={i}
              key={i}
              callback={callback}
              scrollToIndex={scrollToIndex}
            ></GridBlock>
          );
        }

        const centerBlocks = currentGridBlocks.slice(
          Math.max(minIndex - blocksInView.current[0], 0),
          Math.max(maxIndex - blocksInView.current[0] + 1, 0)
        );

        const afterBlocks = [];
        for (
          let i = Math.max(blocksInView.current[1] + 1, minIndex);
          i <= maxIndex;
          i++
        ) {
          afterBlocks.push(
            <GridBlock
              blockIndex={i}
              key={i}
              callback={callback}
              load={props.load}
              scrollToIndex={scrollToIndex}
              first={first}
            ></GridBlock>
          );
        }

        const newGridBlocks = preBlocks
          .concat(centerBlocks)
          .concat(afterBlocks);
        blocksInView.current = [minIndex, maxIndex];

        return newGridBlocks;
      });
    }
  }

  useEffect(() => {
    set(props.page ?? 0, props.page ?? 0, props.n, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Placeholder blockHeight={blocksInView.current[0]}></Placeholder>
      {gridBlocks}
      <Placeholder
        blockHeight={lastVisibleBlockIndex - blocksInView.current[1]}
      ></Placeholder>
    </div>
  );
}

const GridContext = createContext({
  loadBlock: () => {},
  setMaxBlockIndex: () => {},
  getBlock: () => {},
  getLastVisibleBlockIndex: () => {},
  getMaxBlockIndex: () => {},
  setBlock: () => {},
  setLastVisibleBlockIndex: () => {},
});

function GridWrapper(props) {
  console.log("grid wrapper render");

  return (
    <GridContext.Provider
      value={{
        setLastVisibleBlockIndex: props.setLastVisibleBlockIndex,
        loadBlock: props.loadBlock,
        setMaxBlockIndex: props.setMaxBlockIndex,
        getBlock: props.getBlock,
        setBlock: props.setBlock,
        getLastVisibleBlockIndex: props.getLastVisibleBlockIndex,
        getMaxBlockIndex: props.getMaxBlockIndex,
      }}
    >
      <Grid
        callback={props.callback}
        maxNumberBlocks={props.maxNumberBlocks - 1}
        page={props.page}
        n={props.n}
      />
    </GridContext.Provider>
  );
}

export default GridWrapper;

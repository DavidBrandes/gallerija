import classes from "./css/Related.module.css";
import Grid from "../grid/Grid";

import itemData from "../../../api/item";
import { useDispatch } from "react-redux";
import store from "../../../store/store";
import {
  relatedSetMaxBlockIndex,
  relatedSetBlock,
  relatedSetLastVisibleBlockIndex,
  initRelated,
} from "../../../store/modules/querySlice";

function Related(props) {
  const maxNumberBlocks = Number(process.env.REACT_APP_MAX_RELATED_BLOCKS);
  const dispatch = useDispatch();

  dispatch(initRelated({ id: props.id }));

  console.log("related render", props.id);

  const loadBlock = ({ startIndex, stopIndex, getNumberItems }) =>
    itemData.getRelatedItems({
      startIndex,
      stopIndex,
      getNumberItems,
      id: props.id,
    });

  const setBlock = ({ blockIndex, block }) =>
    dispatch(relatedSetBlock({ blockIndex, block }));

  const setMaxBlockIndex = ({ maxBlockIndex }) =>
    dispatch(relatedSetMaxBlockIndex({ maxBlockIndex }));

  const setLastVisibleBlockIndex = ({ blockIndex }) =>
    dispatch(relatedSetLastVisibleBlockIndex({ blockIndex }));

  const getBlock = ({ blockIndex }) =>
    store.getState().query.related.blocks[blockIndex];

  const getLastVisibleBlockIndex = () =>
    store.getState().query.related.lastVisibleBlockIndex;

  const getMaxBlockIndex = () => store.getState().query.related.maxBlockIndex;

  return (
    <div className={classes.container}>
      <p className={classes.title}>Related Artworks</p>
      <Grid
        key={props.id}
        loadBlock={loadBlock}
        setBlock={setBlock}
        setMaxBlockIndex={setMaxBlockIndex}
        setLastVisibleBlockIndex={setLastVisibleBlockIndex}
        getBlock={getBlock}
        getLastVisibleBlockIndex={getLastVisibleBlockIndex}
        getMaxBlockIndex={getMaxBlockIndex}
        maxNumberBlocks={maxNumberBlocks}
      ></Grid>
    </div>
  );
}

export default Related;

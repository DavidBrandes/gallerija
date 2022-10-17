import classes from "./css/Related.module.css";
import Grid from "./Grid";

import itemData from "../../api/item";
import { useCallback } from "react";

function Related(props) {
  const maxItems = Number(process.env.REACT_APP_MAX_RELATED_ITEMS);

  console.log("related render", props.id);

  const load = useCallback(
    ({ index, nItems }) =>
      itemData.getRelatedItems({ index, nItems, id: props.id, maxItems }),
    [props.id]
  );

  return (
    <div className={classes.container}>
      <p className={classes.title}>Related Artworks</p>
      <Grid load={load}></Grid>
    </div>
  );
}

export default Related;

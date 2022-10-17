import React from "react";

import classes from "./css/ViewButton.module.css";
import Link from "../../utils/Link";

import { setSearch } from "../../../utility/location";

function ViewButton(props) {
  return (
    <div className={classes.container}>
      <Link
        to={`/detail/${props.item.id}`}
        beforeNavigate={setSearch.bind(null, { n: props.index + 1 })}
        state={{ item: props.item }}
      >
        <button className={classes.button}>{`View Painting`}</button>
      </Link>
    </div>
  );
}

export default ViewButton;

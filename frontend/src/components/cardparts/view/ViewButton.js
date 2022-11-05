import React from "react";

import Link from "../../utils/Link";

import { setSearch } from "../../../utility/location";

const ViewButton = React.memo((props) => {
  return (
    <Link
      to={`/detail/${props.item.id}`}
      beforeNavigate={
        props.index ? setSearch.bind(null, { n: props.index + 1 }) : undefined
      }
      state={{ item: props.item }}
    >
      <div className={props.containerClass}>
        <a className={props.textClass}>View Painting</a>
      </div>
    </Link>
  );
});

export default ViewButton;

import Link from "../../utils/Link";
import React from "react";

const Image = React.memo((props) => {
  return (
    <div className={props.containerClass}>
      <Link
        to={props.to}
        beforeNavigate={props.beforeNavigate}
        state={{ item: props.item }}
      >
        <img
          src={props.item.srcLow[0]}
          alt={props.item.title}
          className={props.imageClass}
        />
      </Link>
    </div>
  );
});

export default Image;

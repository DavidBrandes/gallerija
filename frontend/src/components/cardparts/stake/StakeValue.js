import { convertCurrency } from "../../../utility/number";

import React from "react";

const StakeValue = React.memo((props) => {
  const value = convertCurrency(props.value);

  return (
    <React.Fragment>
      <div className={props.containerClass}>
        <h3 className={props.titleClass}>{props.title}</h3>
        {value ? (
          <span className={props.valueClass}>{value}</span>
        ) : (
          <span className={props.valueClass}>&nbsp;</span>
        )}
      </div>
    </React.Fragment>
  );
});

export default StakeValue;

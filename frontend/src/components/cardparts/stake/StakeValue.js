import classes from "./css/StakeValue.module.css";

import { convertCurrency } from "../../../utility/number";

function StakeValue(props) {
  return (
    <div>
      {Number.isFinite(props.value) ? (
        <div className={classes.container}>
          <h3 className={classes.title}>{props.title}</h3>
          <span className={classes.value}>{convertCurrency(props.value)}</span>
        </div>
      ) : null}
    </div>
  );
}

export default StakeValue;

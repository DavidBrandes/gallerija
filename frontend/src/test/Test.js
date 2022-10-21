import classes from "./Test.module.css";

import Related from "../components/structure/related/Related";

function Test() {
  return (
    <div className={classes.parent}>
      <div className={classes.child}></div>

      <Related id={3} />
      <div className={classes.child}></div>
    </div>
  );
}

export default Test;

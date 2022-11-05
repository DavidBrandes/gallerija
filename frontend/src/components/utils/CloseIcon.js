import classes from "./css/CloseIcon.module.css";

import { BsChevronRight } from "react-icons/bs";

function CloseIcon() {
  return (
    <div className={classes.container}>
      <div className={classes.text}>CLOSE</div>
      <BsChevronRight className={classes.icon} />
    </div>
  );
}

export default CloseIcon;

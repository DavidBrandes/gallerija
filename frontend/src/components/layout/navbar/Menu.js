import classes from "./css/Menu.module.css";

import { RiCloseLine } from "react-icons/ri";

function Menu(props) {
  return (
    <div className={classes.container}>
      <RiCloseLine
        onClick={() => props.showClick(false)}
        className={classes.close}
      />
    </div>
  );
}

export default Menu;

import classes from "./css/Navbar.module.css";

import { FiChevronLeft } from "react-icons/fi";

import Link from "../utils/Link";
import { useLocation } from "react-router";

function Navbar(props) {
  const { state } = useLocation();

  return (
    <div className={classes.container}>
      <div>
        <Link to={state?.from === "/" ? -1 : "/"}>
          {props.showBackLink ? (
            <div className={classes.title}>
              <FiChevronLeft />
              <div>GALLERIJA</div>
            </div>
          ) : null}
        </Link>
      </div>
      <div className={classes.user}>
        <div className={classes.item}>Menu</div>
      </div>
    </div>
  );
}

export default Navbar;

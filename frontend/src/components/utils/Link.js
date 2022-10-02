import { Link as RouterLink, useLocation } from "react-router-dom";
import classes from "./css/Link.module.css";

function Link(props) {
  const location = useLocation();

  return (
    <RouterLink
      className={classes.container}
      to={props.to}
      state={{ from: location.pathname }}
    >
      {props.children}
    </RouterLink>
  );
}

export default Link;

import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router";

import classes from "./css/Link.module.css";

function Link(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function click() {
    if (pathname === props.to) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }

    if (props.beforeNavigate) props.beforeNavigate();
    navigate(props.to, { state: { from: pathname, ...props.state } });
  }
  return (
    <div onClick={click} className={classes.container}>
      {props.children}
    </div>
  );
}

export default Link;

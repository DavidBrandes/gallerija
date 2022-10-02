import classes from "./css/Navbar.module.css";

import { FiChevronLeft } from "react-icons/fi";

import { useSelector, useDispatch } from "react-redux";
import { logInOut } from "../../store/modules/userSlice";

import { useNavigate, useLocation } from "react-router-dom";

function Navbar(props) {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div>
        <div onClick={() => navigate(state?.from === "/" ? -1 : "/")}>
          {props.showBackLink ? (
            <div className={classes.title}>
              <FiChevronLeft />
              <div>GALLERIJA</div>
            </div>
          ) : null}
        </div>
      </div>
      <div className={classes.user}>
        <div className={classes.item}>Search</div>
        <div className={classes.item} onClick={() => dispatch(logInOut())}>
          {loggedIn ? "Logout" : "Login"}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

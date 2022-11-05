import classes from "./css/Navbar.module.css";

import { BsChevronLeft } from "react-icons/bs";
import { RiUser6Fill, RiGridFill, RiSearchLine } from "react-icons/ri";
import { TbGridDots } from "react-icons/tb";
import Link from "../../utils/Link";
import { useLocation } from "react-router";
import Dropdown from "./Dropdown";
import { useSelector } from "react-redux";
import Menu from "./Menu";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setOpen } from "../../../store/modules/overlaySlice";

function Navbar(props) {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const hasWishlist = useSelector(
    (state) => Object.keys(state.user.wishlist).length
  );
  const hasStakes = useSelector(
    (state) => Object.keys(state.user.stakes).length
  );

  function showClick(show) {
    !show
      ? (document.body.style.overflow = "unset")
      : (document.body.style.overflow = "hidden");

    setShowMenu(show);
    dispatch(setOpen({ open: show }));
  }

  const collectionItems = ["View Collection"];
  if (hasStakes) collectionItems.push("Your Stakes");
  if (hasWishlist) collectionItems.push("Wishlist");

  const aboutItems = ["About Gallerija", "Contact Us"];

  console.log("navbar render");

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Link to={state?.from === "/" ? -1 : "/"}>
          <div className={classes.titleContainer}>
            {props.showBackLink ? <BsChevronLeft /> : null}
            <div className={classes.titleText}>GALLERIJA</div>
          </div>
        </Link>
        <div className={classes.items}>
          <Dropdown title={"Collection"} items={collectionItems} />
          <Dropdown title={"Info"} items={aboutItems} />
        </div>
        <div className={classes.icons}>
          {/* <RiSearchLine className={classes.icon} /> */}
          <RiUser6Fill className={classes.icon} />
          <TbGridDots
            className={classes.icon}
            onClick={() => showClick(true)}
          />
        </div>
      </div>
      {showMenu ? <Menu showClick={showClick} /> : null}
    </div>
  );
}

export default Navbar;

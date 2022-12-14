import classes from "./css/Menu.module.css";

import { RiCloseLine } from "react-icons/ri";
import { useSelector } from "react-redux";

function Menu(props) {
  const hasWishlist = useSelector(
    (state) => Object.keys(state.user.wishlist).length
  );
  const hasStakes = useSelector(
    (state) => Object.keys(state.user.stakes).length
  );

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <RiCloseLine
          onClick={() => props.showClick(false)}
          className={classes.close}
        />
        <div className={classes.links}>
          <div className={classes.link}>
            <div className={classes.linkTitle}>Collection</div>
            <div className={classes.items}>
              <a className={classes.item}>View Collection</a>
              {hasWishlist ? <a className={classes.item}>Wishlist</a> : null}
              {hasStakes ? <a className={classes.item}>Your Stakes</a> : null}
            </div>
          </div>
          <div className={classes.link}>
            <div className={classes.linkTitle}>Account</div>
            <div className={classes.items}>
              <a className={classes.item}>Logout</a>
              <a className={classes.item}>Settings</a>
            </div>
          </div>
          <div className={classes.link}>
            <div className={classes.linkTitle}>Info</div>
            <div className={classes.items}>
              <a className={classes.item}>About Gallerija</a>
              <a className={classes.item}>Contact Us</a>
            </div>
          </div>
          <div className={classes.link}>
            <div className={classes.linkTitle}>Follow Us</div>
            <div className={classes.items}>
              <a className={classes.item}>Newsletter</a>
              <a className={classes.item}>Instagram</a>
            </div>
          </div>
        </div>
        <div className={classes.title}>GALLERIJA</div>
      </div>
    </div>
  );
}

export default Menu;

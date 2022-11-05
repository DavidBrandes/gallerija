import classes from "./css/Footer.module.css";

import { useSelector } from "react-redux";

function Footer(props) {
  const hasWishlist = useSelector(
    (state) => Object.keys(state.user.wishlist).length
  );
  const hasStakes = useSelector(
    (state) => Object.keys(state.user.stakes).length
  );

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.links}>
          <div className={classes.link}>
            <div className={classes.title}>Collection</div>
            <div className={classes.items}>
              <a className={classes.item}>View Collection</a>
              {hasWishlist ? <a className={classes.item}>Wishlist</a> : null}
              {hasStakes ? <a className={classes.item}>Your Stakes</a> : null}
            </div>
          </div>
          <div className={classes.link}>
            <div className={classes.title}>Info</div>
            <div className={classes.items}>
              <a className={classes.item}>About Gallerija</a>
              <a className={classes.item}>Contact Us</a>
            </div>
          </div>
          <div className={classes.link}>
            <div className={classes.title}>Follow Us</div>
            <div className={classes.items}>
              <a className={classes.item}>Newsletter</a>
              <a className={classes.item}>Instagram</a>
            </div>
          </div>
        </div>
        <div className={classes.legal}>
          <div className={classes.legalItems}>
            <a className={classes.legalItem}>Privacy and Cookie Policy</a>
            <a className={classes.legalItem}>Terms and Conditions</a>
          </div>
          <p className={classes.legalInfo}>
            GALLERIJA, {new Date().getFullYear()} &copy;
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;

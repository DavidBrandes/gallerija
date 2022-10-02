import classes from "./css/Banner.module.css";

import Link from "../utils/Link";

function Banner(props) {
  return (
    <div className={classes.banner}>
      <Link to={"/"}>
        <h1 className={classes.name}>GALLERIJA</h1>
      </Link>
    </div>
  );
}

export default Banner;

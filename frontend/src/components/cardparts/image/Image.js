import classes from "./css/Image.module.css";
import Link from "../../utils/Link";

function Image(props) {
  return (
    <div className={classes.container}>
      <Link
        to={props.to}
        beforeNavigate={props.beforeNavigate}
        state={{ item: props.item }}
      >
        <img
          src={props.item.srcLow[0]}
          alt={props.item.title}
          className={classes.image}
        />
      </Link>
    </div>
  );
}

export default Image;

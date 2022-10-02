import classes from "./css/GridCard.module.css";

function GridCard(props) {
  return <div className={classes.container}>{props.children}</div>;
}

export default GridCard;

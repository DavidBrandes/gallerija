import classes from "./css/Title.module.css";

function Title(props) {
  return (
    <div className={classes.container}>
      <p className={classes.title}>{props.item.title}</p>
      <p className={classes.subTitle}>{props.item.subTitle}</p>
    </div>
  );
}

export default Title;

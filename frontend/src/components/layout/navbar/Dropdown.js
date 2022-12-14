import classes from "./css/Dropdown.module.css";

function Dropdown(props) {
  return (
    <div className={classes.container}>
      <div className={classes.title}>{props.title}</div>
      <div className={classes.wrapper}>
        <div className={classes.items}>
          {props.items.map((item, index) => (
            <div className={classes.item} key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;

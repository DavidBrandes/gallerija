import classes from "./css/ItemDescription.module.css";
import React from "react";

const ItemDescription = React.memo((props) => {
  return (
    <div className={classes.container}>
      {Object.entries(props.description).map((entry, i) => {
        return (
          <div key={i}>
            <h4 className={classes.title}>{entry[0]}</h4>
            <span className={classes.text}>{entry[1]}</span>
          </div>
        );
      })}
    </div>
  );
});

export default ItemDescription;

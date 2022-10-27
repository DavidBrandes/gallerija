import classes from "./css/Title.module.css";

import React from "react";

const Title = React.memo((props) => {
  console.log("title render");

  return (
    <div className={classes.container}>
      <p className={classes.title}>{props.title}</p>
      <p className={classes.subTitle}>{props.subTitle}</p>
    </div>
  );
});

export default Title;

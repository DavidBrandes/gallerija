import React from "react";

import classes from "./css/ItemTitle.module.css";

class ItemTitle extends React.Component {
  render() {
    return (
      <div
        className={`${classes.container} ${
          this.props.underlined ? classes.underlined : ""
        }`}
      >
        <p className={classes.title}>{this.props.title}</p>
        <p className={classes.subTitle}>{this.props.subTitle}</p>
      </div>
    );
  }
}

export default ItemTitle;

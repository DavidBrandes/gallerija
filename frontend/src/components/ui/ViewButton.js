import React from "react";

import classes from "./css/ViewButton.module.css";
import Link from "../utils/Link";

class ViewButton extends React.Component {
  render() {
    return (
      <div className={classes.container}>
        <Link to={`/detail/${this.props.id}`}>
          <button
            className={classes.button}
          >{`View ${this.props.type}`}</button>
        </Link>
      </div>
    );
  }
}

export default ViewButton;

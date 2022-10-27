import classes from "./css/ArtistCard.module.css";

import React from "react";

function ArtistCard(props) {
  return (
    <div className={classes.container}>
      <p className={classes.text}>
        <span className={classes.header}>Artists</span>
        {props.artists.map((artist) => (
          <span>{artist}</span>
        ))}
      </p>
    </div>
  );
}

export default ArtistCard;

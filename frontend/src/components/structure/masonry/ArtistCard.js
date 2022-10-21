import GridCard from "./GridCard";
import classes from "./css/ArtistCard.module.css";

import React from "react";

function ArtistCard(props) {
  return (
    <GridCard>
      <p className={classes.text}>
        <span className={classes.header}>Artists</span>
        <span>Egon Schiele</span>
        <span>Auguste Rodin</span>
        <span>Paul Cézanne</span>
        <span>Jan Brueghel the Elder </span>
        <span>William A. Harper</span>
        <span>Velázquez</span>
        <span>Henri-Edmond Delacroix</span>
        <span>Gustav Klimt</span>
      </p>
    </GridCard>
  );
}

//TODO: memo necesary?
export default React.memo(ArtistCard);

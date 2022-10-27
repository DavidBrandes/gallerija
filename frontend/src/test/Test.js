import classes from "./Test.module.css";

import ArtistCard from "../components/structure/masonry/ArtistCard";
import InfoCard from "../components/structure/masonry/InfoCard";

function Test() {
  return (
    <div className={classes.parent}>
      <ArtistCard></ArtistCard>
      <InfoCard></InfoCard>
    </div>
  );
}

export default Test;

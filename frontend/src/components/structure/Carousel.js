import { default as BootstrapCarousel } from "react-bootstrap/Carousel";
import Image from "./Image";

import classes from "./css/Carousel.module.css";

function Carousel(props) {
  return (
    <BootstrapCarousel
      keyboard={false}
      className={classes.container}
      slide={false}
      interval={null}
    >
      {props.srcLow.map((image, i) => (
        <BootstrapCarousel.Item key={i} className={classes.item}>
          <Image
            srcLow={props.srcLow[i]}
            srcHigh={props.srcHigh[i]}
            title={props.title}
          ></Image>
        </BootstrapCarousel.Item>
      ))}
    </BootstrapCarousel>
  );
}

export default Carousel;

import { default as BootstrapCarousel } from "react-bootstrap/Carousel";

import { useRef } from "react";
import Overlay from "../../utils/Overlay";
import classes from "./css/Carousel.module.css";
import React from "react";

function Image(props) {
  return (
    <img
      src={props.src}
      alt={props.alt}
      className={props.className}
      onClick={() => {
        props.click(true);
      }}
    />
  );
}

function ImageWrapper(props) {
  const ref = useRef(null);

  return (
    <React.Fragment>
      <Image
        src={props.srcLow}
        alt={props.title}
        click={() => ref.current.showClick(true)}
        className={classes.imageSmall}
      />
      <Overlay ref={ref} zValue={3}>
        <Image
          src={props.srcHigh}
          alt={props.title}
          click={() => ref.current.showClick(false)}
          className={classes.imageBig}
        />
      </Overlay>
    </React.Fragment>
  );
}

const Carousel = React.memo((props) => {
  return (
    <React.Fragment>
      {props.srcLow.length > 1 ? (
        <BootstrapCarousel
          keyboard={false}
          className={classes.container}
          slide={false}
          interval={null}
        >
          {props.srcLow.map((image, i) => (
            <BootstrapCarousel.Item key={i} className={classes.item}>
              <ImageWrapper
                srcLow={props.srcLow[i]}
                srcHigh={props.srcHigh[i]}
                title={props.title}
              ></ImageWrapper>
            </BootstrapCarousel.Item>
          ))}
        </BootstrapCarousel>
      ) : (
        <ImageWrapper
          srcLow={props.srcLow[0]}
          srcHigh={props.srcHigh[0]}
          title={props.title}
        ></ImageWrapper>
      )}
    </React.Fragment>
  );
});

export default Carousel;

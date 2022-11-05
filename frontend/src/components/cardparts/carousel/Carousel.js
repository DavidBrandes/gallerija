import { default as BootstrapCarousel } from "react-bootstrap/Carousel";

import { useRef } from "react";
import Overlay from "../../utils/Overlay";
import React from "react";

import classes from "./css/Carousel.module.css";

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
        className={props.imageSmallClass}
      />
      <Overlay ref={ref} zValue={3} overlayClass={classes.overlayContainer}>
        <Image
          src={props.srcHigh}
          alt={props.title}
          click={() => ref.current.showClick(false)}
          className={props.imageBigClass}
        />
      </Overlay>
    </React.Fragment>
  );
}

const Carousel = React.memo((props) => {
  return (
    <React.Fragment>
      {props.srcLow.length > 1 ? (
        <BootstrapCarousel keyboard={false} slide={false} interval={null}>
          {props.srcLow.map((image, i) => (
            <BootstrapCarousel.Item key={i}>
              <ImageWrapper
                srcLow={props.srcLow[i]}
                srcHigh={props.srcHigh[i]}
                title={props.title}
                imageBigClass={props.imageBigClass}
                imageSmallClass={props.imageSmallClass}
              ></ImageWrapper>
            </BootstrapCarousel.Item>
          ))}
        </BootstrapCarousel>
      ) : (
        <ImageWrapper
          srcLow={props.srcLow[0]}
          srcHigh={props.srcHigh[0]}
          title={props.title}
          imageBigClass={props.imageBigClass}
          imageSmallClass={props.imageSmallClass}
        ></ImageWrapper>
      )}
    </React.Fragment>
  );
});

export default Carousel;

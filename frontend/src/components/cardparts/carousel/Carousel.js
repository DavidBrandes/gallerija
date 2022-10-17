import { default as BootstrapCarousel } from "react-bootstrap/Carousel";

import { useRef } from "react";
import Overlay from "../../utils/Overlay";
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
    <div>
      <Image
        src={props.srcLow}
        alt={props.title}
        click={() => ref.current.showClick(true)}
        className={classes.imageSmall}
      />
      <Overlay ref={ref}>
        <Image
          src={props.srcHigh}
          alt={props.title}
          click={() => ref.current.showClick(false)}
          className={classes.imageBig}
        />
      </Overlay>
    </div>
  );
}

function Carousel(props) {
  return (
    <div>
      {props.item.srcLow.length > 1 ? (
        <BootstrapCarousel
          keyboard={false}
          className={classes.container}
          slide={false}
          interval={null}
        >
          {props.item.srcLow.map((image, i) => (
            <BootstrapCarousel.Item key={i} className={classes.item}>
              <ImageWrapper
                srcLow={props.item.srcLow[i]}
                srcHigh={props.item.srcHigh[i]}
                title={props.item.title}
              ></ImageWrapper>
            </BootstrapCarousel.Item>
          ))}
        </BootstrapCarousel>
      ) : (
        <ImageWrapper
          srcLow={props.item.srcLow[0]}
          srcHigh={props.item.srcHigh[0]}
          title={props.item.title}
        ></ImageWrapper>
      )}
    </div>
  );
}

export default Carousel;

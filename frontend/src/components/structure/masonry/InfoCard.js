import classes from "./css/InfoCard.module.css";

function InfoCard() {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Urbi et Orbi</h2>
      <div className={classes.text}>
        <p>
          Vivamus congue metus sit amet sollicitudin facilisis. Integer a enim
          arcu. Nulla at tellus nec magna viverra faucibus at nec est. Morbi
          magna elit, pharetra a dui ac, posuere hendrerit ipsum. Integer nec
          tellus elit. Pellentesque sit amet ullamcorper justo, eget hendrerit
          sem. Curabitur enim orci, dignissim at aliquet ut, viverra in libero.
          Quisque gravida erat at lectus dapibus hendrerit.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          fermentum aliquet ante vel rhoncus. Donec eget consectetur neque.
          Etiam ut commodo neque, in efficitur nisi. Sed in luctus magna. Etiam
          sit amet dignissim tellus. Aliquam semper pretium volutpat. Aenean
          maximus faucibus tristique. Sed ullamcorper malesuada augue, ut
          accumsan enim ultricies eu.
        </p>
      </div>
    </div>
  );
}

export default InfoCard;

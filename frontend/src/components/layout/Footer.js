import classes from "./css/Footer.module.css";

function Footer(props) {
  return (
    <div className={classes.container}>
      <img className={classes.logo} src="/icons/Cyrillic_Я.svg" alt="" />
    </div>
  );
}

export default Footer;

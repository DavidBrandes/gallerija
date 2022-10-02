import classes from "./css/Footer.module.css";
import Email from "../utils/Email";

function Footer(props) {
  return (
    <div className={classes.footer}>
      <div className={classes.upper}>
        <p className={classes.contact}>
          <span className={classes.contactTitle}>Contact</span>
          <span>Artjofska Alexeijevna Amidania</span>
          <Email address={"artsy@paintings.ru"}>
            <span className={classes.email}>artsy@paintings.ru</span>
          </Email>
          <span>+7 (495) 268 06 19</span>{" "}
          <span className={classes.instagram}>Instagram</span>
        </p>

        <p className={classes.info}>
          <span className={classes.link}>Info</span>
          <span className={classes.link}>Imprint</span>
          <span className={classes.link}>Data Privacy</span>
        </p>
      </div>
      <div className={classes.lower}>
        <img className={classes.logo} src="./icons/Cyrillic_Я.svg" alt="" />
      </div>
    </div>
  );
}

export default Footer;

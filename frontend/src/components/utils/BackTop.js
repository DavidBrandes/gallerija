import classes from "./css/BackTop.module.css";
import { FiChevronUp } from "react-icons/fi";

function BackTop() {
  return (
    <div className={classes.container}>
      <FiChevronUp
        className={classes.back}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "auto" });
        }}
      />
    </div>
  );
}

export default BackTop;

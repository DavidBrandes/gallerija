import classes from "./css/BackTop.module.css";

function BackTop() {
  return (
    <div
      className={classes.container}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      Back to Top
    </div>
  );
}

export default BackTop;

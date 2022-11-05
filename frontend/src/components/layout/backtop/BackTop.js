function BackTop(props) {
  return (
    <div
      className={props.containerClass}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      Back to Top
    </div>
  );
}

export default BackTop;

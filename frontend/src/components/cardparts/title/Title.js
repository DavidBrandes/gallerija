import React from "react";

const Title = React.memo((props) => {
  console.log("title render");

  return (
    <div className={props.containerClass}>
      <p className={props.titleClass}>{props.item.title}</p>
      <p className={props.subTitleClass}>{props.item.subTitle}</p>
    </div>
  );
});

export default Title;

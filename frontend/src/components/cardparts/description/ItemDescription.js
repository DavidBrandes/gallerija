import React from "react";

const ItemDescription = React.memo((props) => {
  return (
    <div className={props.containerClass}>
      {Object.entries(props.description).map((entry, i) => {
        return (
          <div key={i}>
            <h4 className={props.titleClass}>{entry[0]}</h4>
            <span className={props.textClass}>{entry[1]}</span>
          </div>
        );
      })}
    </div>
  );
});

export default ItemDescription;

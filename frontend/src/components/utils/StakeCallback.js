import React, { useEffect } from "react";
import stakeData from "../../api/stake";

import { objectEqual } from "../../utility/object";

//TODO: do i need memo here?
const StakeCallback = React.memo((props) => {
  //TODO: why does this trigger a double rerender for the parent
  //on the first two interval calls; even though the data passed to
  //set stake does not chnage. I guess its ok as we will chnage this
  //towards websockets anyways, so here for every call there should
  //be a change in the data handed to setSTake. Since we only receive a
  //call on a update, the obect spread ... is good for us

  const stakeUpdateInterval = Number(
    process.env.REACT_APP_STAKE_UPDATE_INTERVAL
  );

  async function load() {
    try {
      const { stake } = await stakeData.getStake({ id: props.id });
      console.log("new stake call", props.id);

      props.setStake((currentStake) => {
        if (objectEqual(currentStake, stake)) return currentStake;
        else return { ...stake };
      });
      // props.setStake({ ...stake }); // always update parent
    } catch (error) {
      console.error(error);
      props.setStake({});
    }
  }

  useEffect(() => {
    if (props.inView) {
      load();
      let interval;
      if (Number.isFinite(stakeUpdateInterval))
        interval = setInterval(() => {
          load();
        }, stakeUpdateInterval);

      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.inView]);

  return null;
});

export default StakeCallback;

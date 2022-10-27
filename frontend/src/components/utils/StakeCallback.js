import React, { useEffect, useRef } from "react";
import stakeData from "../../api/stake";

import { objectEqual } from "../../utility/object";

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
  const delay = useRef(props.delay);

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
  //in masonry, when scrollTo is set we have a small window where the first
  //masonry elements will be in view and therefore call an upi update that then
  //becomes unecessary later on. Thats why we set the timeout, maybe there is
  //also a better way to achieve this

  useEffect(() => {
    if (props.inView) {
      const timeout = setTimeout(
        () => load(),
        delay.current ? Number(process.env.REACT_APP_STAKE_UPDATE_TIMEOUT) : 0
      );

      let interval;
      if (Number.isFinite(stakeUpdateInterval))
        interval = setInterval(() => {
          load();
        }, stakeUpdateInterval);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.inView]);

  useEffect(() => {
    if (delay.current) {
      const timeout = setTimeout(() => {
        delay.current = false;
      }, Number(process.env.REACT_APP_STAKE_UPDATE_TIMEOUT));

      return () => {
        clearTimeout(timeout);
      };
    }
  }, []);

  return null;
});

export default StakeCallback;

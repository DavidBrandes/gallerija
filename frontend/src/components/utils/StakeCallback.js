import React, { useEffect } from "react";
import stakeData from "../../api/stake";

const StakeCallback = React.memo((props) => {
  //TODO: why does this trigger a double rerender for the parent
  //on the first two interval calls; even though the data passed to
  //set stake does not chnage. I guess its ok as we will chnage this
  //towards websockets anyways, so here for every call there should
  //be a change in the data handed to setSTake. Since we only receive a
  //call on a update, the obect spread ... is good for us

  async function load() {
    try {
      const { stake } = await stakeData.getStake({ id: props.id });
      console.log("new stake call", props.id);

      props.setStake({ ...stake });
    } catch (error) {
      console.error(error);
      props.setStake({});
    }
  }

  useEffect(() => {
    if (props.inView) {
      load();
      const interval = setInterval(() => {
        load();
      }, Number(process.env.REACT_APP_API_CALLBACK_TIME));

      return () => {
        clearInterval(interval);
      };
    }
  }, [props.id, props.inView]);

  return null;
});

export default StakeCallback;

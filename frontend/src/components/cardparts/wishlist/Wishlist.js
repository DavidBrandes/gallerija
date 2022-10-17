import classes from "./css/Wishlist.module.css";

import { useSelector, useDispatch } from "react-redux";
import { updateWishlist } from "../../../store/modules/userSlice";
import userData from "../../../api/user";

function Wishlist(props) {
  const onWishlist = useSelector((state) => state.user.wishlist[props.item.id]);
  const dispatch = useDispatch();

  async function click() {
    // we update the wishlist in advance to show an immediate effect
    dispatch(
      updateWishlist({
        id: props.item.id,
        onWishlist: !onWishlist,
      })
    );
    try {
      const response = await userData.updateWishlist({
        id: props.item.id,
        onWishlist: !onWishlist,
      });
      // dispatch(updateWishlist(response));
    } catch (error) {
      console.error(error);
      dispatch(
        updateWishlist({
          id: props.item.id,
          onWishlist: !onWishlist,
        })
      );
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.text} onClick={click}>
        {onWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </div>
    </div>
  );
}

export default Wishlist;

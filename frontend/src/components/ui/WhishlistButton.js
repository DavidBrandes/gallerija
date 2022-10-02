import React from "react";

import classes from "./css/WishlistButton.module.css";

import { useSelector, useDispatch } from "react-redux";
import { addRemoveWishlist } from "../../store/modules/userSlice";

function WishlistButton(props) {
  const onWishlist = useSelector((state) => state.user.wishlist[props.id]);
  const dispatch = useDispatch();

  return (
    <div className={classes.container}>
      <button
        className={classes.button}
        onClick={() => dispatch(addRemoveWishlist({ id: props.id }))}
      >
        {onWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>
    </div>
  );
}

export default WishlistButton;

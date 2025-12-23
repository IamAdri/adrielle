"use client";
import { useEffect } from "react";
import { useCartItems } from "../_contextAPI/CartItemsContextApi";
import { useCurrentUserEmail } from "../_contextAPI/CurrentUserEmailContextApi";
import { getCartItems } from "../_lib/data-service";

function DisplayNumberOfCartItems({ currentUser }) {
  const { isCart, setIsCart } = useCartItems();
  const { setIsCurrentUser, guestIDIsRemoved } = useCurrentUserEmail();
  //Get number of products from cart table of active user
  useEffect(() => {
    setIsCurrentUser(currentUser);
    async function loadCartItems() {
      const cartItems = await getCartItems(
        currentUser,
        localStorage.getItem("guestID")
      );
      setIsCart(cartItems.length);
    }
    loadCartItems();
  }, [guestIDIsRemoved]);

  return <span>{isCart > 0 && isCart}</span>;
}

export default DisplayNumberOfCartItems;

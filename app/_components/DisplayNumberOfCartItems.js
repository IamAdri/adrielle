"use client";

import { useEffect } from "react";
import { useCartItems } from "../_contextAPI/CartItemsContextApi";
import { useCurrentUserEmail } from "../_contextAPI/CurrentUserEmailContextApi";
import { getCartItems } from "../_lib/data-service";

function DisplayNumberOfCartItems({ currentUser }) {
  const { isCart, setIsCart } = useCartItems();
  const { setIsCurrentUser, guestIDIsRemoved } = useCurrentUserEmail();

  useEffect(() => {
    setIsCurrentUser(currentUser);
    async function loadCartItems() {
      const cartItems = await getCartItems(currentUser);
      setIsCart(cartItems.length);
    }
    loadCartItems();
  }, [guestIDIsRemoved]);

  return <span>{isCart > 0 && isCart}</span>;
}

export default DisplayNumberOfCartItems;

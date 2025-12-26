"use client";
import { useChangingColor } from "../_contextAPI/ChangingColorContextApi";
import { useEffect, useRef, useState } from "react";
import { getItemsDetailsByCartTable } from "../_lib/data-service";
import { supabase } from "../_lib/supabase";
import { useRealTimeSubscription } from "./useRealTimeSubscription";
import { useCartItems } from "../_contextAPI/CartItemsContextApi";

export function useDisplayCartItems(currentUser) {
  const { setColorSrc } = useChangingColor();
  const { isCart, setIsCart } = useCartItems();
  const [cartItems, setCartItems] = useState([]);

  async function loadCartItemsDetails() {
    const cartItemsDetails = await getItemsDetailsByCartTable(
      currentUser,
      localStorage.getItem("guestID")
    );
    setCartItems(cartItemsDetails);
    setIsCart(cartItemsDetails.length);
  }
  //Load cart products of active user
  useEffect(() => {
    loadCartItemsDetails();
  }, [currentUser]);

  //Update cart items when making changes in items table
  useEffect(() => {
    const channel = supabase
      .channel("cartItems")
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "cart",
        },
        (payload) => {
          console.log(payload);
          return loadCartItemsDetails();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { cartItems, setColorSrc };
}

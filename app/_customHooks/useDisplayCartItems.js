"use client";
import { useChangingColor } from "../_contextAPI/ChangingColorContextApi";
import { useEffect, useRef, useState } from "react";
import { getItemsDetailsByCartTable } from "../_lib/data-service";
import { supabase } from "../_lib/supabase";
import { useRealTimeSubscription } from "./useRealTimeSubscription";

export function useDisplayCartItems(currentUser) {
  const { setColorSrc } = useChangingColor();
  const [cartItems, setCartItems] = useState([]);

  async function loadCartItemsDetails() {
    const cartItemsDetails = await getItemsDetailsByCartTable(
      currentUser,
      localStorage.getItem("guestID")
    );
    setCartItems(cartItemsDetails);
  }
  //Load cart products of active user
  useEffect(() => {
    loadCartItemsDetails();
  }, [currentUser]);
  useRealTimeSubscription({ onChange: () => loadCartItemsDetails() });
  /*
  //Update cart items when making changes in items table
  const subscribedRef = useRef(false);
  useEffect(() => {
    if (subscribedRef.current) return;
    subscribedRef.current = true;
    const channel = supabase
      .channel("items")
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "items",
        },
        (payload) => {
          loadCartItemsDetails();
          console.log("change received", payload);
          //setIsError(true);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "items",
        },
        (payload) => {
          console.log("change received", payload);
          loadCartItemsDetails();
          //setIsError(true);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);*/

  return { cartItems, setColorSrc };
}

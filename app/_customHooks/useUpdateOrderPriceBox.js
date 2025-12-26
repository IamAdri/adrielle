"use client";
import { useCurrentUserEmail } from "../_contextAPI/CurrentUserEmailContextApi";
import { useCartItems } from "../_contextAPI/CartItemsContextApi";
import { useEffect, useRef, useState } from "react";
import { getCartItems } from "../_lib/data-service";
import { supabase } from "../_lib/supabase";
import { useRealTimeSubscription } from "./useRealTimeSubscription";

export function useUpdateOrderPriceBox() {
  const { isCurrentUser } = useCurrentUserEmail();
  const { isCart } = useCartItems();
  const [itemsFromCart, setItemsFromCart] = useState([]);
  const [pricesOfItems, setPricesOfItems] = useState([]);
  const { totalProductsPrice, setTotalProductsPrice } = useCartItems();
  const [deliveryCost, setDeliveryCost] = useState(0);
  //Get cart items of active user
  async function getItemsFromCart() {
    const items = await getCartItems(
      isCurrentUser,
      localStorage.getItem("guestID")
    );
    setItemsFromCart(items);
  }
  useEffect(() => {
    getItemsFromCart();
  }, [isCurrentUser, isCart]);
  // console.log(totalProductsPrice);
  //Update order box prices when making change in cart products and quantities
  // useRealTimeSubscription({ onChange: () => getItemsFromCart() });
  const subscribedRef = useRef(false);
  const channelRef = useRef(null);
  useEffect(() => {
    if (subscribedRef.current) return;
    subscribedRef.current = true;
    console.log("MOUNT");
    const channel = supabase
      .channel("cart")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "cart",
        },
        (payload) => {
          return getItemsFromCart();
          //  setItemsFromCart((prev) => [
          //    payload.new,
          //    ...prev.filter((item) => item.id !== payload.new.id),
          //  ]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "cart",
        },
        (payload) => {
          return getItemsFromCart();
          //  setItemsFromCart((prev) => [
          //   payload.new,
          //   ...prev.filter((item) => item.id !== payload.new.id),
          //  ]);
        }
      )
      .subscribe((status) => {
        console.log("FAV SUB STATUS:", status);
        if (status === "SUBSCRIBED") {
          subscribedRef.current = true;
        }
      });
    channelRef.current = channel;
    return () => {
      supabase.removeChannel(channelRef.current);
      if (channelRef.current && subscribedRef.current) {
        supabase.removeChannel(channelRef.current);
        subscribedRef.current = false;
        channelRef.current = null;
      }
    };
  }, [itemsFromCart]);
  //Create an array with prices per quantity of all products from cart
  useEffect(() => {
    let itemPrices = [];
    itemsFromCart.map((item) => {
      itemPrices.push(item.pricePerQuantity);
    });
    setPricesOfItems(itemPrices);
  }, [itemsFromCart]);
  //Sum up all prices of products from cart
  useEffect(() => {
    setTotalProductsPrice(
      Number(pricesOfItems.reduce((acc, curr) => acc + curr, 0).toFixed(2))
    );
  }, [pricesOfItems]);
  //Set delivery cost based on total price of cart products
  useEffect(() => {
    if (totalProductsPrice >= 200) {
      setDeliveryCost(0);
    } else {
      setDeliveryCost(25);
    }
  }, [totalProductsPrice]);

  return { totalProductsPrice, deliveryCost };
}

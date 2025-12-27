"use client";
import { useCurrentUserEmail } from "../_contextAPI/CurrentUserEmailContextApi";
import { useCartItems } from "../_contextAPI/CartItemsContextApi";
import { useEffect, useState } from "react";
import { getCartItems } from "../_lib/data-service";
import { supabase } from "../_lib/supabase";

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
  //Update price when changes are made in cart items
  useEffect(() => {
    const channel = supabase
      .channel("cart")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "cart",
        },
        () => {
          return getItemsFromCart();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "cart",
        },
        () => {
          return getItemsFromCart();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
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

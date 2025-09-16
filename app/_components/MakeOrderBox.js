"use client";

import { useEffect, useState } from "react";
import { getCartItems } from "../_lib/data-service";
import { useCurrentUserEmail } from "../_contextAPI/CurrentUserEmailContextApi";
import { supabase } from "../_lib/supabase";
import { useCartItems } from "../_contextAPI/CartItemsContextApi";
import { redirect, usePathname } from "next/navigation";
import Button from "./Button";

function MakeOrderBox({ currentUser }) {
  const pathname = usePathname();
  const { isCurrentUser } = useCurrentUserEmail();
  const { isCart } = useCartItems();
  const [itemsFromCart, setItemsFromCart] = useState([]);
  const [pricesOfItems, setPricesOfItems] = useState([]);
  const { totalProductsPrice, setTotalProductsPrice } = useCartItems();
  const [deliveryCost, setDeliveryCost] = useState(0);

  useEffect(() => {
    (async function getItemsFromCart() {
      const items = await getCartItems(
        isCurrentUser,
        localStorage.getItem("guestID")
      );
      // console.log(items);
      setItemsFromCart(items);
    })();
  }, [isCurrentUser, isCart]);

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
        (payload) => {
          setItemsFromCart((prev) => [
            payload.new,
            ...prev.filter((item) => item.id !== payload.new.id),
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [itemsFromCart]);
  //console.log(itemsFromCart);

  useEffect(() => {
    let itemPrices = [];
    itemsFromCart.map((item) => {
      itemPrices.push(item.pricePerQuantity);
    });
    setPricesOfItems(itemPrices);
  }, [itemsFromCart]);
  //console.log(pricesOfItems);

  useEffect(() => {
    setTotalProductsPrice(pricesOfItems.reduce((acc, curr) => acc + curr, 0));
  }, [pricesOfItems]);
  //console.log(totalProductsPrice);

  useEffect(() => {
    if (totalProductsPrice >= 200) {
      setDeliveryCost(0);
    } else {
      setDeliveryCost(25);
    }
  }, [totalProductsPrice]);

  const handleGoToDelivery = () => {
    currentUser === "not loged in"
      ? redirect("/login")
      : pathname === "/bag"
      ? redirect("/delivery")
      : redirect("/bag");
  };

  return (
    <div className="border-2 border-lightlavender rounded-sm py-5 px-10 h-full">
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-xl">Order summary</h2>
        <div className=" flex flex-col items-start gap-3">
          <span>Product cost: {totalProductsPrice} EUR</span>
          <span>Delivery cost: {deliveryCost} EUR</span>
          <span className="font-bold text-lg">
            Total: {totalProductsPrice + deliveryCost} EUR
          </span>
        </div>
        <div className="flex justify-center">
          <Button handleClick={handleGoToDelivery}>
            {pathname === "/bag" ? "Continue" : "Back to cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MakeOrderBox;

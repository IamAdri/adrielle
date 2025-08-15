"use client";
import { useEffect, useState } from "react";
import DeliveryDetailsDiv from "./DeliveryDetailsDiv";
import MainHeading from "./MainHeading";
import Link from "next/link";
import {
  getShoesDetailsByCartTable,
  insertOrderDetails,
  removeCartItemsAfterSentOrder,
} from "../_lib/data-service";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useCartItems } from "../_contextAPI/CartItemsContextApi";
import OrderedProductsDetails from "./OrderedProductsDetails";

function OrderDetails({ sessionUser }) {
  const [paymentMethod, setPaymentMethod] = useState("cashPayment");
  const [cartItems, setCartItems] = useState("");
  const { setIsCart } = useCartItems();
  useEffect(() => {
    (async function loadCartItemsDetails() {
      const cartItemsDetails = await getShoesDetailsByCartTable(
        sessionUser,
        localStorage.getItem("guestID")
      );
      setCartItems(cartItemsDetails);
    })();
  }, [sessionUser]);
  //console.log(cartItems);
  const date = new Date().toLocaleDateString("en-CA");
  console.log(date);
  const orderDate = new Date(date);
  orderDate.setDate(orderDate.getDate() + 3);
  const deliveryDate = orderDate.toLocaleDateString("en-CA");
  console.log(deliveryDate);

  const handleSendOrder = async () => {
    const products = cartItems.map((cartItem) => {
      return {
        name: cartItem.shoes.name,
        size: cartItem.size,
        color: cartItem.selectedColor,
        quantity: cartItem.quantity,
        pricePerQuantity: cartItem.pricePerQuantity,
      };
    });

    await insertOrderDetails(
      date,
      sessionUser,
      "processing",
      deliveryDate,
      products,
      paymentMethod
    );

    await removeCartItemsAfterSentOrder(sessionUser);
    setIsCart(0);
    redirect("/congratulations");
  };

  return (
    <div className="flex flex-col flex-wrap items-start border-2 border-lightlavender p-5 rounded-sm w-3/5">
      <MainHeading>Delivery details</MainHeading>
      <OrderedProductsDetails cartItems={cartItems} />
      <DeliveryDetailsDiv sessionUser={sessionUser} />
      <form className="flex gap-5">
        <h3 className="font-semibold">Payment</h3>
        <div className="flex gap-3">
          <div className="flex gap-1">
            <input
              type="radio"
              id="cashPayment"
              value="cashPayment"
              checked={paymentMethod === "cashPayment"}
              onChange={() => {
                setPaymentMethod("cashPayment");
              }}
            />
            <label htmlFor="paymentMethodCash">cash at delivery</label>
          </div>
          <div className="flex gap-1">
            <input
              type="radio"
              id="cardPayment"
              value="cardPayment"
              checked={paymentMethod === "cardPayment"}
              onChange={() => {
                setPaymentMethod("cardPayment");
              }}
            />
            <label htmlFor="paymentMethodCard">card at delivery</label>
          </div>
        </div>
      </form>
      <p className="mt-7 text-sm text-coolgrey">
        By placing your order, you agree to the{" "}
        <Link href="/terms" className="underline text-deepgrey">
          Terms and Conditions{" "}
        </Link>
        and
        <Link href="/privacy" className="underline text-deepgrey">
          {" "}
          Privacy Policy
        </Link>
        .
      </p>
      <button
        onClick={handleSendOrder}
        className=" mt-7 bg-lavenderhighlight rounded-sm border-2 border-darklavender font-semibold px-3 py-1 cursor-pointer text-base hover:text-lg  hover:font-bold text-warmwhite hover:text-white"
      >
        Send order
      </button>
    </div>
  );
}

export default OrderDetails;

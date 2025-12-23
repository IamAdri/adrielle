"use client";
import { useEffect, useState } from "react";
import DeliveryDetailsDiv from "./DeliveryDetailsDiv";
import MainHeading from "./MainHeading";
import Link from "next/link";
import {
  getItemsDetailsByCartTable,
  insertOrderDetails,
  removeCartItemsAfterSentOrder,
} from "../_lib/data-service";
import { redirect } from "next/navigation";
import { useCartItems } from "../_contextAPI/CartItemsContextApi";
import OrderedProductsDetails from "./OrderedProductsDetails";
import Spinner from "./Spinner";
import Button from "./Button";
import { useUserDetails } from "../_contextAPI/UserDetailsContextApi";

function OrderDetails({ sessionUser }) {
  const [paymentMethod, setPaymentMethod] = useState("cashPayment");
  const [cartItems, setCartItems] = useState("");
  const { setIsCart, totalProductsPrice } = useCartItems();
  const [isMounted, setIsMounted] = useState(false);
  const { userDetails } = useUserDetails();
  const [deliveryDetails, setDeliveryDetails] = useState("");
  useEffect(() => {
    // Wait until client render is finished to avoid hydration mismatch
    setIsMounted(true);
  }, []);
  //Load products from cart of active user
  useEffect(() => {
    (async function loadCartItemsDetails() {
      const cartItemsDetails = await getItemsDetailsByCartTable(
        sessionUser,
        localStorage.getItem("guestID")
      );
      setCartItems(cartItemsDetails);
    })();
  }, [sessionUser]);
  //Check if user has delivery details from account page or not
  useEffect(() => {
    if (userDetails.streetName === null) setDeliveryDetails(false);
    if (userDetails.streetName !== null) setDeliveryDetails(true);
  }, [userDetails]);
  //Identify today`s date and set date for delivery
  const date = new Date().toLocaleDateString("en-CA");
  const orderDate = new Date(date);
  orderDate.setDate(orderDate.getDate() + 3);
  const deliveryDate = orderDate.toLocaleDateString("en-CA");
  //Remove products from cart table and add order details in order table on submit order
  const handleSendOrder = async () => {
    if (userDetails.streetName === null) {
      setDeliveryDetails(false);
    } else {
      setDeliveryDetails(true);
      const products = cartItems.map((cartItem) => {
        return {
          name: cartItem.items.name,
          size: cartItem.size,
          color: cartItem.selectedColor,
          image: cartItem.selectedColorSrc,
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
        paymentMethod,
        totalProductsPrice
      );
      await removeCartItemsAfterSentOrder(sessionUser);
      setIsCart(0);
      redirect("/congratulations");
    }
  };
  return (
    <div className="flex flex-col flex-wrap items-start border-2 border-lightlavender p-5 rounded-sm w-4/5 md:w-3/5">
      <MainHeading>Delivery details</MainHeading>
      {!isMounted ? (
        <Spinner />
      ) : (
        <>
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
        </>
      )}
      <p className="my-7 text-sm text-coolgrey">
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
      <Button disabled={!deliveryDetails} handleClick={handleSendOrder}>
        Send order
      </Button>
      {!deliveryDetails && (
        <p className="mt-3">
          Please add required delivery details in order to send the order!
          <span className="text-red">*</span>
        </p>
      )}
    </div>
  );
}

export default OrderDetails;

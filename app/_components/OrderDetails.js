"use client";
import { useEffect, useState } from "react";
import DeliveryDetailsDiv from "./DeliveryDetailsDiv";
import MainHeading from "./MainHeading";
import Link from "next/link";
import { getShoesDetailsByCartTable } from "../_lib/data-service";
import Image from "next/image";

function OrderDetails({ sessionUser }) {
  const [paymentMethod, setPaymentMethod] = useState("cashPayment");
  const [cartItems, setCartItems] = useState("");
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
  console.log(orderDate);
  //console.log(calcDate);
  console.log(deliveryDate);
  //console.log(date);
  return (
    <div className="flex flex-col flex-wrap items-start border-2 border-lightlavender p-5 rounded-sm w-3/5">
      <MainHeading>Delivery details</MainHeading>
      <div className="flex flex-col whitespace-nowrap gap-15 mt-15">
        {cartItems.length > 0 &&
          cartItems.map((cartItem) => {
            //console.log(cartItem);
            return (
              <ul
                key={`${cartItem.shoes.id}, ${cartItem.size}, ${cartItem.id}`}
              >
                <li className="flex gap-5">
                  <div className="w-[150px] h-[150px]">
                    <Image
                      src={cartItem.selectedColorSrc}
                      width={150}
                      height={150}
                      alt="Main image for favorite item."
                    />
                  </div>

                  <div className="flex flex-wrap gap-5  lg:gap-25 w-full">
                    <div className="flex flex-col items-start">
                      <h3>{cartItem.shoes.name}</h3>
                      <span>{`size: ${cartItem.size}`}</span>
                      <span>{cartItem.selectedColor}</span>
                      <span>{`quantity: ${cartItem.quantity}`}</span>
                      <span className="text-coolgrey text-sm mt-1">
                        Selled by Adrielle
                      </span>
                    </div>

                    <span className="font-medium text-base text-deepgrey text-end mr-15">{`${cartItem.pricePerQuantity} ${cartItem.shoes.currency}`}</span>
                  </div>
                </li>
              </ul>
            );
          })}
      </div>
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
      <button className=" mt-7 bg-lavenderhighlight rounded-sm border-2 border-darklavender font-semibold px-3 py-1 cursor-pointer text-base hover:text-lg  hover:font-bold text-warmwhite hover:text-white">
        Send order
      </button>
    </div>
  );
}

export default OrderDetails;

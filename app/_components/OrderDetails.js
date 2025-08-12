"use client";
import { useState } from "react";
import DeliveryDetailsDiv from "./DeliveryDetailsDiv";
import MainHeading from "./MainHeading";

function OrderDetails({ sessionUser }) {
  const [cashPayment, setCashPayment] = useState("");
  const [cardPayment, setCardPayment] = useState("");
  return (
    <div className="flex flex-col items-start border-2 border-lightlavender p-5 rounded-sm">
      <MainHeading>Delivery details</MainHeading>
      <DeliveryDetailsDiv sessionUser={sessionUser} />
      <form>
        <h3 className="font-semibold">Payment</h3>
        <input
          type="radio"
          id="paymentMethodCash"
          name="paymentMethodCash"
          value={cashPayment}
          onChange={(e) => {
            console.log(e.target.value);
            setCashPayment(e.target.value);
          }}
        />
        <label htmlFor="paymentMethodCash">cash at delivery</label>
        <input
          type="radio"
          id="paymentMethodCard"
          name="paymentMethodCard"
          value={cardPayment}
          onChange={(e) => {
            setCardPayment(e.target.value);
          }}
        />
        <label htmlFor="paymentMethodCard">card at delivery</label>
      </form>
    </div>
  );
}

export default OrderDetails;

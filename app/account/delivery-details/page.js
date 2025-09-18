"use client";

import Button from "@/app/_components/Button";
import Spinner from "@/app/_components/Spinner";
import { useUserDetails } from "@/app/_contextAPI/userDetailsContextApi";
import { updateDeliveryDetails } from "@/app/_lib/actions";
import { useEffect, useState } from "react";

function DeliveryDetails() {
  const [isMounted, setIsMounted] = useState(false);
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const { userDetails } = useUserDetails();
  useEffect(() => {
    // Așteaptă până la client render pentru a preveni hydration mismatch
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (userDetails?.streetName !== null) {
      setStreetName(userDetails.streetName);
      setStreetNumber(userDetails.streetNumber);
      setHouseNumber(userDetails.house);
      setPostalCode(userDetails.postalCode);
      setPhone(userDetails.phone);
    }
  }, [userDetails]);

  if (!isMounted) return <Spinner />;
  console.log(userDetails);
  return (
    <form
      action={updateDeliveryDetails}
      className="flex flex-wrap flex-col gap-3 items-start border border-coolgrey rounded-sm p-3 "
    >
      <div className="flex gap-2">
        <h3 className="font-semibold">Street address (line 1): </h3>
        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="flex gap-2">
            <label htmlFor="street">Name:</label>
            <input
              type="text"
              id="street"
              name="street"
              placeholder="Street name"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
              required
              className={`border border-coolgrey text-coolgrey px-1 rounded-sm focus:text-deepgrey ${
                streetName !== "Street name" ? "text-deepgrey" : ""
              }`}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="streetNumber">Number: </label>
            <input
              type="text"
              id="streetNumber"
              name="streetNumber"
              placeholder="Street number"
              value={streetNumber}
              onChange={(e) => setStreetNumber(e.target.value)}
              required
              className={`border border-coolgrey text-coolgrey px-1 rounded-sm focus:text-deepgrey ${
                streetNumber !== "Street number" ? "text-deepgrey" : ""
              }`}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <label htmlFor="house" className="font-semibold">
          Street address (line 2):
        </label>
        <input
          type="text"
          id="house"
          name="house"
          placeholder="Apartment, building, floor"
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
          className={`border border-coolgrey text-coolgrey px-1 rounded-sm w-55 focus:text-deepgrey ${
            houseNumber !== "Apartment, building, floor " ? "text-deepgrey" : ""
          }`}
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="postalCode" className="font-semibold">
          Postal code:
        </label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          placeholder="Postal code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
          className={`border border-coolgrey text-coolgrey px-1 rounded-sm focus:text-deepgrey ${
            postalCode !== "Postal code" ? "text-deepgrey" : ""
          }`}
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="phone" className="font-semibold">
          Phone number:
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className={`border border-coolgrey text-coolgrey px-1 rounded-sm focus:text-deepgrey ${
            phone !== "Phone number" ? "text-deepgrey" : ""
          }`}
        />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}

export default DeliveryDetails;

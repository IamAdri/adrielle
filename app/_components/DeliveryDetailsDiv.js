"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getUserDetails,
  getUserEmail,
  insertUserEmail,
  removeUserDetails,
} from "../_lib/data-service";
import Spinner from "./Spinner";
import { useUserDetails } from "../_contextAPI/userDetailsContextApi";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Button from "./Button";

function DeliveryDetailsDiv({ sessionUser }) {
  const [user, setUser] = useState("");
  const { userDetails, setUserDetails } = useUserDetails();

  useEffect(() => {
    const isEmailInDatabase = async () => {
      const getEmailFromDatabase = await getUserEmail();
      const isUserEmail = getEmailFromDatabase
        .map((userEmail) => {
          return userEmail.email;
        })
        .includes(sessionUser);
      //console.log(isUserEmail);
      if (!isUserEmail) setUser(sessionUser);
      const userDetailsFromDatabase = await getUserDetails(sessionUser);
      console.log(userDetailsFromDatabase);
      setUserDetails(userDetailsFromDatabase[0]);
      // if (!isUserEmail) await insertUserEmail(sessionUser);
      //
    };
    isEmailInDatabase();
  }, [sessionUser, setUserDetails]);

  useEffect(() => {
    (async function insertEmail() {
      if (user) await insertUserEmail(user);
      const userDetailsFromDatabase = await getUserDetails(sessionUser);
      console.log(userDetailsFromDatabase);
      setUserDetails(userDetailsFromDatabase[0]);
    })();
  }, [user]);

  //console.log(logedInUser);
  const handleDeleteUserDetails = async () => {
    removeUserDetails(sessionUser);
    const userDetailsFromDatabase = await getUserDetails(sessionUser);
    // console.log(userDetailsFromDatabase);
    setUserDetails(userDetailsFromDatabase[0]);
    // redirect("/account");
  };
  console.log(user, userDetails);
  return (
    <>
      {userDetails === undefined && <Spinner />}
      {userDetails && userDetails.streetName === null && (
        <div className="flex flex-col items-start gap-5 mx-15  my-10 p-5 border-nude border-2">
          <p>
            Please add delivery details required for processing your orders!
          </p>
          <button
            className="bg-lightlavender px-3 py-1 rounded-md cursor-pointer hover:bg-lavenderhighlight hover:text-warmwhite"
            onClick={() => redirect("/account/delivery-details")}
          >
            Add delivery details
          </button>
        </div>
      )}
      {userDetails && userDetails.streetName !== null && (
        <div className="flex flex-col items-start gap-5  my-10 p-5 w-full border-nude border-2">
          <h2 className="font-semibold">Delivery details</h2>
          <p>
            <span className="text-coolgrey">Address 1: </span>
            <span>{`${userDetails.streetName} ${userDetails.streetNumber}`}</span>
          </p>
          <p>
            <span className="text-coolgrey">Address 2: </span>
            <span>{userDetails.house}</span>
          </p>
          <p>
            <span className="text-coolgrey">Postal code: </span>
            <span>{userDetails.postalCode}</span>
          </p>
          <p>
            <span className="text-coolgrey">Phone number: </span>
            <span>{userDetails.phone}</span>
          </p>
          <div className="flex gap-3">
            <Button handleClick={() => redirect("/account/delivery-details")}>
              <PencilSquareIcon className="size-5" />
              <span>Edit</span>
            </Button>
            <button
              className="flex gap-1 items-center bg-coolgrey px-3 py-1 rounded-md cursor-pointer hover:bg-gray-600 hover:text-white"
              onClick={handleDeleteUserDetails}
            >
              <TrashIcon className="size-5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DeliveryDetailsDiv;
/*useEffect(() => {
    const isEmailInDatabase = async () => {
      const userDetailsFromDatabase = await getUserDetails(sessionUser);
      console.log(userDetailsFromDatabase);

      const getEmailFromDatabase = await getUserEmail();
      const isUserEmail = getEmailFromDatabase
        .map((userEmail) => {
          return userEmail.email;
        })
        .includes(sessionUser);
      //console.log(isUserEmail);
      if (!isUserEmail) setUser(sessionUser);
      // if (!isUserEmail) await insertUserEmail(sessionUser);
      //setUserDetails(userDetailsFromDatabase[0]);
    };
    isEmailInDatabase();
  }, [sessionUser, setUserDetails]);

  useEffect(() => {
    (async function insertEmail() {
      if (user) await insertUserEmail(user);
    })();
  }, [user]);*/

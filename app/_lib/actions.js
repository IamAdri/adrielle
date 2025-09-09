"use server";

import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import {
  getReviewsAndRatingsByUserAndProductName,
  updateNotLogedInCartItems,
  updateNotLogedInFavoriteItems,
  updateRatingAndReviewByProductName,
} from "./data-service";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateDeliveryDetails(formData) {
  //console.log(formData);
  const session = await auth();
  //console.log(session);
  if (!session) throw new Error("You must be logged in");
  const streetName = formData?.get("street");
  const streetNumber = formData?.get("streetNumber");
  const house = formData?.get("house");
  const postalCode = formData?.get("postalCode");
  const phone = formData?.get("phone");
  //console.log(streetName, postalCode);
  const updateData = { streetName, streetNumber, house, postalCode, phone };

  const { data, error } = await supabase
    .from("userDetails")
    .update(updateData)
    .eq("email", session.user.email);

  if (error) console.log(error);
  redirect("/account");
}

export async function sendReview(formData) {
  const session = await auth();
  const userEmail = session.user.email;
  const userName = session.user.name;
  const rating = formData.get("rating");
  const review = formData.get("review");
  const productName = formData.get("productName");
  const productImage = formData.get("productImage");
  const pathName = formData.get("pathName");
  console.log(formData, session.user.email);
  const isProductRated = await getReviewsAndRatingsByUserAndProductName(
    userEmail,
    productName
  );
  console.log(isProductRated);
  if (isProductRated.length > 0) {
    await updateRatingAndReviewByProductName(
      rating,
      review,
      productName,
      userEmail
    );
  } else {
    const { data, error } = await supabase
      .from("reviews")
      .insert([
        {
          userEmail: userEmail,
          userName: userName,
          rating: rating,
          review: review,
          productName: productName,
          productImage: productImage,
        },
      ])
      .select();
    if (error) console.log(error);
  }

  redirect(pathName);
}

export async function removeStorage(currentUser) {
  await updateNotLogedInFavoriteItems(
    currentUser,
    localStorage.getItem("guestID")
  );
  await updateNotLogedInCartItems(currentUser, localStorage.getItem("guestID"));
  //
  //setIsUpdated(true);

  if (currentUser !== "not logged in") localStorage.removeItem("guestID");
}

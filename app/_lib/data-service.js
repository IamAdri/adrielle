import { supabase } from "./supabase";

export async function getItems() {
  const { data, error } = await supabase.from("items").select("*").order("id");

  if (error) {
    console.log(error);
    throw new Error("Could not load items.");
  }
  return data;
}

export async function getItemByName(name) {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("name", name)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Could not load item.");
  }
  return data;
}

export async function getFavoriteItems(logedInUser, guestID) {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("logedInUser", logedInUser)
    .eq("guestID", guestID || "empty");
  if (error) {
    console.log(error);
    throw new Error("Could not load favorite items.");
  }
  return data;
}

export async function getCartItems(currentUserEmail, guestID) {
  const { data, error } = await supabase
    .from("cart")
    .select("*")
    .eq("logedInUser", currentUserEmail)
    .eq("guestID", guestID || "empty");

  if (error) {
    console.log(error);
    throw new Error("Could not load cart items.");
  }
  return data;
}

export async function insertFavoriteItem(
  itemName,
  itemID,
  selectedColorSrc,
  selectedColor,
  logedInUser,
  guestID
) {
  const { data, error } = await supabase
    .from("favorites")
    .insert([
      {
        name: itemName,
        favorite_id: itemID,
        selectedColorSrc: selectedColorSrc,
        selectedColor: selectedColor,
        logedInUser: logedInUser,
        guestID: guestID || "empty",
      },
    ])
    .select();
  if (error) {
    console.log(error);
    throw new Error("Could not insert favorite item.");
  }

  return data;
}

export async function removeAllSameFavoriteItems(sameFavoriteItems, guestID) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .in("name", sameFavoriteItems)
    .eq("logedInUser", "not loged in")
    .eq("guestID", guestID);

  if (error) {
    console.log(error);
    throw new Error("Could not remove all same favorite items.");
  }
}

export async function updateNotLogedInFavoriteItems(logedInUser, guestID) {
  let sameFavoriteItems = [];
  const favoriteItemsOfCurrentUser = await getFavoriteItems(
    logedInUser,
    "empty"
  );
  const favoriteItemsOfNotLogedIn = await getFavoriteItems(
    "not loged in",
    guestID
  );
  favoriteItemsOfCurrentUser.map((favoriteItemOfUser) => {
    favoriteItemsOfNotLogedIn.map((favoriteItemOfNotLogedIn) => {
      if (
        favoriteItemOfUser.name === favoriteItemOfNotLogedIn.name &&
        favoriteItemOfUser.selectedColor ===
          favoriteItemOfNotLogedIn.selectedColor
      ) {
        sameFavoriteItems.push(favoriteItemOfUser.name);
      }
    });
  });
  await removeAllSameFavoriteItems(sameFavoriteItems, guestID);

  const { data, error } = await supabase
    .from("favorites")
    .update({ logedInUser: logedInUser, guestID: "empty" })
    .eq("logedInUser", "not loged in")
    .eq("guestID", guestID)
    .select();
  if (error) {
    console.log(error);
    throw new Error("Could not update not loged in favorite items.");
  }

  return data;
}

export async function removeAllSameCartItems(sameCartItems, guestID) {
  const { error } = await supabase
    .from("cart")
    .delete()
    .in("name", sameCartItems)
    .eq("logedInUser", "not loged in")
    .eq("guestID", guestID);

  if (error) {
    console.log(error);
    throw new Error("Could not remove all same cart items.");
  }
}

export async function updateNotLogedInCartItems(logedInUser, guestID) {
  let sameCartItems = [];
  const cartItemsOfCurrentUser = await getCartItems(logedInUser, "empty");
  const cartItemsOfNotLogedIn = await getCartItems("not loged in", guestID);
  cartItemsOfCurrentUser.map((cartItemOfUser) => {
    cartItemsOfNotLogedIn.map((cartItemOfNotLogedIn) => {
      if (
        cartItemOfUser.name === cartItemOfNotLogedIn.name &&
        cartItemOfUser.size === cartItemOfNotLogedIn.size &&
        cartItemOfUser.selectedColor === cartItemOfNotLogedIn.selectedColor
      ) {
        sameCartItems.push(cartItemOfUser.name);
      }
    });
  });
  await removeAllSameCartItems(sameCartItems, guestID);

  const { data, error } = await supabase
    .from("cart")
    .update({ logedInUser: logedInUser, guestID: "empty" })
    .eq("logedInUser", "not loged in")
    .eq("guestID", guestID)
    .select();
  if (error) {
    console.log(error);
    throw new Error("Could not update all not loged in cart items.");
  }

  return data;
}

export async function insertCartItem(
  itemName,
  itemID,
  size,
  price,
  selectedColorSrc,
  selectedColor,
  currentUser,
  guestID
) {
  const { data, error } = await supabase
    .from("cart")
    .insert([
      {
        name: itemName,
        cart_id: itemID,
        size: size,
        quantity: 1,
        pricePerQuantity: price,
        initialPrice: price,
        selectedColorSrc: selectedColorSrc,
        selectedColor: selectedColor,
        logedInUser: currentUser,
        guestID: guestID || "empty",
      },
    ])
    .select();
  if (error) {
    console.log(error);
    throw new Error("Could not insert cart item.");
  }

  return data;
}

export async function removeFavoriteItem(
  itemName,
  selectedColor,
  currentUser,
  guestID
) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("name", itemName)
    .eq("selectedColor", selectedColor)
    .eq("logedInUser", currentUser)
    .eq("guestID", guestID || "empty");
  if (error) {
    console.log(error);
    throw new Error("Could not remove from favorites!");
  }
}

export async function removeCartItem(
  itemName,
  size,
  selectedColor,
  currentUser,
  guestID
) {
  const { error } = await supabase
    .from("cart")
    .delete()
    .eq("name", itemName)
    .eq("size", size)
    .eq("selectedColor", selectedColor)
    .eq("logedInUser", currentUser)
    .eq("guestID", guestID || "empty");

  if (error) {
    console.log(error);
    throw new Error("Could not remove from cart!");
  }
}

export async function removeCartItemsAfterSentOrder(email) {
  const { error } = await supabase
    .from("cart")
    .delete()
    .eq("logedInUser", email);

  if (error) {
    console.log(error);
    throw new Error("Could not remove items from cart after sending order");
  }
}

export async function getItemsDetailsByFavoriteTable(
  currentUserEmail,
  guestID
) {
  let { data, error } = await supabase
    .from("favorites")
    .select()
    .eq("logedInUser", currentUserEmail)
    .eq("guestID", guestID || "empty")
    .select(`"*","items"("*")`);

  if (error) {
    console.log(error);
    throw new Error("Could not load item details from favorite table.");
  }
  return data;
}

export async function getItemsDetailsByCartTable(currentUserEmail, guestID) {
  let { data, error } = await supabase
    .from("cart")
    .select()
    .eq("logedInUser", currentUserEmail)
    .eq("guestID", guestID || "empty")
    .select(`"*","items"("*")`);
  if (error) {
    console.log(error);
    throw new Error("Could not load item details from cart table!");
  }
  return data;
}

export async function updateCartQuantityColumn(
  itemName,
  size,
  selectedColorSrc,
  quantity,
  currentUserEmail,
  guestID
) {
  const { data, error } = await supabase
    .from("cart")
    .update({ quantity: quantity })
    .eq("name", itemName)
    .eq("size", size)
    .eq("selectedColorSrc", selectedColorSrc)
    .eq("logedInUser", currentUserEmail)
    .eq("guestID", guestID || "empty")
    .select();

  if (error) {
    console.log(error);
    throw new Error("Could not update cart quantity.");
  }
  return data;
}

export async function updateCartPricePerQuantityColumn(
  itemName,
  size,
  selectedColorSrc,
  pricePerQuantity,
  currentUserEmail,
  guestID
) {
  const { data, error } = await supabase
    .from("cart")
    .update({ pricePerQuantity: pricePerQuantity })
    .eq("name", itemName)
    .eq("size", size)
    .eq("selectedColorSrc", selectedColorSrc)
    .eq("logedInUser", currentUserEmail)
    .eq("guestID", guestID || "empty")
    .select();

  if (error) {
    console.log(error);
    throw new Error("Could not loupdate price per quantity in the cart.");
  }
  return data;
}

export async function getUserEmail() {
  const { data, error } = await supabase.from("userDetails").select("email");
  if (error) {
    console.log(error);
    throw new Error("Could not get user email.");
  }
  return data;
}

export async function insertUserEmail(email) {
  const { data, error } = await supabase
    .from("userDetails")
    .insert([{ email: email }])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Could not insert user email.");
  }
  return data;
}

export async function getUserDetails(email) {
  let { data, error } = await supabase
    .from("userDetails")
    .select("*")
    .eq("email", email);

  if (error) {
    console.log(error);
    throw new Error("Could not get user details.");
  }
  return data;
}

export async function removeUserDetails(email) {
  let { data, error } = await supabase
    .from("userDetails")
    .update({
      streetName: null,
      streetNumber: null,
      house: null,
      postalCode: null,
      phone: null,
    })
    .eq("email", email);

  if (error) {
    console.log(error);
    throw new Error("Could not remove user details.");
  }
  return data;
}

export async function insertOrderDetails(
  date,
  userEmail,
  status,
  deliveryDate,
  products,
  paymentMethod,
  totalProductsPrice
) {
  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        created_at: date,
        email: userEmail,
        status: status,
        deliveryDate: deliveryDate,
        products: products,
        paymentMethod: paymentMethod,
        totalPrice: totalProductsPrice,
      },
    ])
    .select();
  if (error) {
    console.log(error);
    throw new Error("Could not insert order details!");
  }

  return data;
}

export async function getOrdersDetails(sessionUser) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("email", sessionUser)
    .order("created_at");

  if (error) {
    console.log(error);
    throw new Error("Could not load order details.");
  }
  return data;
}

export async function updateOrderStatus(todaysDate) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status: "delivered" })
    .eq("status", "processing")
    .lte("deliveryDate", todaysDate)
    .select();
  if (error) {
    throw new Error("Could not update delivery status.");
  }

  return data;
}

export async function getReviewsAndRatingsByUserAndProductName(
  userEmail,
  productName
) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("userEmail", userEmail)
    .eq("productName", productName);

  if (error) {
    console.error(error);
    throw new Error(
      "Could not get reviews and ratings by user and product name."
    );
  }

  return data;
}

export async function getReviewsAndRatingsByProductName(productName) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("productName", productName);

  if (error) {
    console.error(error);
    throw new Error("Could not get reviews and ratings by product name.");
  }

  return data;
}

export async function getReviewsAndRatingsByUser(userEmail) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("userEmail", userEmail);

  if (error) {
    console.error(error);
    throw new Error("Could not get reviews and ratings by user.");
  }

  return data;
}

export async function getAllRatingsByProductName(name) {
  const { data, error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("productName", name);

  if (error) {
    console.error(error);
    throw new Error("Could not get all reviews and ratings by user.");
  }

  return data;
}

export async function updateRatingAndReviewByProductName(
  rating,
  review,
  productName,
  userEmail
) {
  const { data, error } = await supabase
    .from("reviews")
    .update({ rating: rating, review: review })
    .eq("productName", productName)
    .eq("userEmail", userEmail)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Could not update rating and review by product name.");
  }
}

export async function deleteReviewsAndRatingsByUser(userEmail, productName) {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("productName", productName)
    .eq("userEmail", userEmail);

  if (error) {
    console.error(error);
    throw new Error("Could not remove reviews and ratings by user.");
  }
}

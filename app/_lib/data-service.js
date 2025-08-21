import { supabase } from "./supabase";

export async function getShoes() {
  const { data, error } = await supabase.from("shoes").select("*").order("id");

  if (error) {
    console.log(error);
    throw new Error("Could not load");
  }
  return data;
}

export async function getItemById(name) {
  const { data, error } = await supabase
    .from("shoes")
    .select("*")
    .eq("name", name)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Could not load");
  }
  return data;
}

export async function getImageByShoesName(name) {
  let { data, error } = await supabase
    .from("shoes")
    .select("variants")
    .eq("name", name);

  if (error) {
    console.log(error);
    throw new Error("Could not load images.");
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
    throw new Error("Could not load");
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
    throw new Error("Could not load");
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
    throw new Error("Could not insert");
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
    throw new Error("Could not insert");
  }
}

export async function updateNotLogedInFavoriteItems(logedInUser, guestID) {
  let sameFavoriteItems = [];
  const favoriteItemsOfCurrentUser = await getFavoriteItems(
    logedInUser,
    "empty"
  );
  console.log(guestID);
  const favoriteItemsOfNotLogedIn = await getFavoriteItems(
    "not loged in",
    guestID
  );
  // console.log(favoriteItemsOfNotLogedIn);
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
  // console.log(sameFavoriteItems);
  await removeAllSameFavoriteItems(sameFavoriteItems, guestID);

  const { data, error } = await supabase
    .from("favorites")
    .update({ logedInUser: logedInUser, guestID: "empty" })
    .eq("logedInUser", "not loged in")
    .eq("guestID", guestID)
    .select();
  if (error) {
    console.log(error);
    throw new Error("Could not insert");
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
    throw new Error("Could not insert");
  }
}

export async function updateNotLogedInCartItems(logedInUser, guestID) {
  let sameCartItems = [];
  const cartItemsOfCurrentUser = await getCartItems(logedInUser, "empty");
  console.log(cartItemsOfCurrentUser);
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
  console.log(sameCartItems);
  await removeAllSameCartItems(sameCartItems, guestID);

  const { data, error } = await supabase
    .from("cart")
    .update({ logedInUser: logedInUser, guestID: "empty" })
    .eq("logedInUser", "not loged in")
    .eq("guestID", guestID)
    .select();
  if (error) {
    console.log(error);
    throw new Error("Could not insert");
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
        selectedColorSrc: selectedColorSrc,
        selectedColor: selectedColor,
        logedInUser: currentUser,
        guestID: guestID || "empty",
      },
    ])
    .select();
  if (error) {
    console.log(error);
    throw new Error("Could not insert");
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
}

export async function removeCartItemsAfterSentOrder(email) {
  const { error } = await supabase
    .from("cart")
    .delete()
    .eq("logedInUser", email);

  if (error) {
    console.log(error);
    throw new Error("Could not remove items from carte after sending order");
  }
}

export async function getShoesById(favoriteID) {
  const { data, error } = await supabase
    .from("shoes")
    .select("*")
    .eq("id", favoriteID);
  if (error) {
    console.log(error);
    throw new Error("Could not load");
  }
  return data;
}

export async function getShoesDetailsByFavoriteTable(
  currentUserEmail,
  guestID
) {
  let { data, error } = await supabase
    .from("favorites")
    .select()
    .eq("logedInUser", currentUserEmail)
    .eq("guestID", guestID || "empty")
    .select(`"*","shoes"("*")`);

  if (error) {
    console.log(error);
    throw new Error("Could not load");
  }
  return data;
}

export async function getShoesDetailsByCartTable(currentUserEmail, guestID) {
  let { data, error } = await supabase
    .from("cart")
    .select()
    .eq("logedInUser", currentUserEmail)
    .eq("guestID", guestID || "empty")
    .select(`"*","shoes"("*")`);
  if (error) {
    console.log(error);
    throw new Error("Could not load");
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
    throw new Error("Could not load");
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
    throw new Error("Could not load");
  }
  return data;
}

export async function getUserEmail() {
  const { data, error } = await supabase.from("userDetails").select("email");
  if (error) {
    console.log(error);
    throw new Error("Could not load");
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
    throw new Error("Could not load");
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
    throw new Error("Could not load");
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
    throw new Error("Could not load");
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
    .eq("email", sessionUser);

  if (error) {
    console.log(error);
    throw new Error("Could not load order details.");
  }
  return data;
}

export async function getOrderDeliveryDate() {
  let { data, error } = await supabase.from("orders").select("deliveryDate");

  if (error) {
    console.log(error);
    throw new Error("Could not load delivery date.");
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
  // 👈 without this, update() returns null
  if (error) {
    console.error(error);
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
    throw new Error(
      "Could not get reviews and ratings by user and product name."
    );
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
    throw new Error("Could not get reviews and ratings by user.");
  }

  return data;
}

export async function getAllReviewsByProductName(name) {
  const { data, error } = await supabase
    .from("reviews")
    .select("review")
    .eq("productName", name);

  if (error) {
    console.error(error);
    throw new Error("Could not get reviews and ratings by user.");
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
}

export async function deleteReviewsAndRatingsByUser(userEmail, productName) {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("productName", productName)
    .eq("userEmail", userEmail);

  if (error) {
    console.error(error);
    throw new Error("Could not get reviews and ratings by user.");
  }
}

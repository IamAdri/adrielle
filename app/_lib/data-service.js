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
  logedInUser,
  guestID
) {
  const { data, error } = await supabase
    .from("favorites")
    .insert([
      {
        name: itemName,
        favorite_id: itemID,
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
      if (favoriteItemOfUser.name === favoriteItemOfNotLogedIn.name) {
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
      if (cartItemOfUser.name === cartItemOfNotLogedIn.name) {
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

export async function removeFavoriteItem(itemName, currentUser, guestID) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("name", itemName)
    .eq("logedInUser", currentUser)
    .eq("guestID", guestID || "empty");
}

export async function removeCartItem(itemName, size, currentUser, guestID) {
  const { error } = await supabase
    .from("cart")
    .delete()
    .eq("name", itemName)
    .eq("size", size)
    .eq("logedInUser", currentUser)
    .eq("guestID", guestID || "empty");
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

export async function getShoesDetailsByFavoriteTable(currentUserEmail) {
  let { data, error } = await supabase
    .from("favorites")
    .select()
    .eq("logedInUser", currentUserEmail)
    .select(`"*","shoes"("*")`);

  if (error) {
    console.log(error);
    throw new Error("Could not load");
  }
  return data;
}

export async function getShoesDetailsByCartTable(currentUserEmail) {
  let { data, error } = await supabase
    .from("cart")
    .select()
    .eq("logedInUser", currentUserEmail)
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

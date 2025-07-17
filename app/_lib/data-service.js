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

export async function getFavoriteItems() {
  const { data, error } = await supabase.from("favorites").select("*");
  if (error) {
    console.log(error);
    throw new Error("Could not load");
  }
  return data;
}

export async function getCartItems() {
  const { data, error } = await supabase.from("cart").select("*");
  if (error) {
    console.log(error);
    throw new Error("Could not load");
  }
  return data;
}

export async function insertFavoriteItem(itemName, itemID) {
  const { data, error } = await supabase
    .from("favorites")
    .insert([{ name: itemName, favorite_id: itemID }])
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
  selectedColor
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
      },
    ])
    .select();
  if (error) {
    console.log(error);
    throw new Error("Could not insert");
  }

  return data;
}

export async function removeFavoriteItem(itemName) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("name", itemName);
}

export async function removeCartItem(itemName, size) {
  const { error } = await supabase
    .from("cart")
    .delete()
    .eq("name", itemName)
    .eq("size", size);
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

export async function getShoesDetailsByFavoriteTable() {
  let { data, error } = await supabase.from("favorites").select(`
    "favorite_id",
    "shoes" (
      "*"
    )
  `);
  if (error) {
    console.log(error);
    throw new Error("Could not load");
  }
  return data;
}

export async function getShoesDetailsByCartTable() {
  let { data, error } = await supabase.from("cart").select(`
    "*",
    "shoes" (
      "*"
    )
  `);
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
  quantity
) {
  const { data, error } = await supabase
    .from("cart")
    .update({ quantity: quantity })
    .eq("name", itemName)
    .eq("size", size)
    .eq("selectedColorSrc", selectedColorSrc)
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
  pricePerQuantity
) {
  const { data, error } = await supabase
    .from("cart")
    .update({ pricePerQuantity: pricePerQuantity })
    .eq("name", itemName)
    .eq("size", size)
    .eq("selectedColorSrc", selectedColorSrc)
    .select();

  if (error) {
    console.log(error);
    throw new Error("Could not load");
  }
  return data;
}

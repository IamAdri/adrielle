import { supabase } from "./supabase";

export async function getShoes() {
  const { data, error } = await supabase.from("shoes").select("*").order("id");

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

export async function insertFavoriteItem(itemName) {
  const { data, error } = await supabase
    .from("favorites")
    .insert([{ name: itemName }])
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

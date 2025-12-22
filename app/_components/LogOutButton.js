"use client";
import { useCartItems } from "../_contextAPI/CartItemsContextApi";
import { useCurrentUserEmail } from "../_contextAPI/CurrentUserEmailContextApi";
import { useFavoriteItems } from "../_contextAPI/FavoriteItemsContextApi";

function LogOutButton() {
  const { setIsFavorite } = useFavoriteItems();
  const { setIsCart } = useCartItems();
  const { setIsCurrentUser } = useCurrentUserEmail();
  //Log out user
  const handelLogOut = () => {
    setIsFavorite(0);
    setIsCart(0);
    setIsCurrentUser("not loged in");
  };
  return (
    <button
      className="bg-deepgrey px-3 hover:font-bold text-warmwhite font-semibold cursor-pointer"
      onClick={handelLogOut}
    >
      Log out
    </button>
  );
}

export default LogOutButton;

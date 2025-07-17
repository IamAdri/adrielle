"use client";

function ButtonForAddingToCart({ favoriteItem }) {
  return (
    <div className="justify-center w-50 h-15 py-1.5 text-xl text-warmwhite">
      <li>
        <h2 className="font-bold text-lg text-deepgrey">
          {favoriteItem.shoes.name}
        </h2>
      </li>
      <li>
        <h3 className="font-medium text-base text-deepgrey">
          {`${favoriteItem.shoes.price} ${favoriteItem.shoes.currency}`}
        </h3>
      </li>
    </div>
  );
}

export default ButtonForAddingToCart;

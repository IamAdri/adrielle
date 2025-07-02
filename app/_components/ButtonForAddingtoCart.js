function ButtonForAddingToCart({ favoriteItem, isHovered, setIsHovered }) {
  return (
    <div>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${
          isHovered ? "bg-deepgrey" : "bg-none"
        } justify-center w-50 h-15 py-1.5 text-xl text-warmwhite cursor-pointer`}
      >
        {isHovered ? (
          <h2>Add to cart</h2>
        ) : (
          <div>
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
        )}
      </button>
    </div>
  );
}

export default ButtonForAddingToCart;

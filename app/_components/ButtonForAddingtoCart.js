"use client";
import { useChooseSize } from "../_contextAPI/ChooseSizeContextApi";
import Modal from "./Modal";

function ButtonForAddingToCart({ favoriteItem, isHovered, setIsHovered }) {
  const { isModalOpened, setIsModalOpened } = useChooseSize();
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

/* {isModalOpened && (
        <Modal
          //setOpenModal={setIsModalOpened}
          id={favoriteItem.shoes.id}
          name={favoriteItem.shoes.name}
          item={favoriteItem.shoes}
          //category={category}
        />
      )}*/

/* <div>
      <button
        // onClick={() => setIsModalOpened(true)}
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
    </div>*/

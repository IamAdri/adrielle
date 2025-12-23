"use client";
import { useChooseSize } from "../_contextAPI/ChooseSizeContextApi";
import { getCartItems } from "../_lib/data-service";
import ButtonForSize from "./ButtonForSize";
import Drawer from "./Drawer";
import { useAddToCart } from "../_customHooks/useAddToCart";

function AddToCart({ item, selectedColorSrc, priceAfterDiscount }) {
  const { clickedSize, isNotSelected, setIsNotSelected, setSameCartItem } =
    useChooseSize();
  const {
    buttonSizeRef,
    buttonAddToCartRef,
    isCurrentUser,
    setQuantity,
    displayedImageInCart,
  } = useAddToCart({
    item,
    priceAfterDiscount,
    selectedColorSrc,
  });
  //Add product to cart on click event/ update quantity if product with same criteria (size, color) already exists
  const handleAddToCart = async () => {
    const cartItems = await getCartItems(
      isCurrentUser,
      localStorage.getItem("guestID")
    );
    if (!clickedSize && item.itemType !== "accessories") setIsNotSelected(true);
    if (clickedSize || item.itemType === "accessories") {
      const isItemInCart = cartItems.filter((itemFiltered) => {
        return (
          item.id === itemFiltered.cart_id &&
          itemFiltered.size === clickedSize &&
          itemFiltered.selectedColorSrc === displayedImageInCart
        );
      });
      if (isItemInCart.length > 0) {
        setSameCartItem(true);
        setQuantity(isItemInCart[0].quantity + 1);
      } else {
        setSameCartItem(false);
      }
    }
  };
  return (
    <div className="flex flex-col items-start gap-1">
      {item.itemType === "accessories" ? null : (
        <div className="w-fit">
          <div className="flex mt-10 justify-between">
            <p className="text-left">Choose your size</p>
            <Drawer />
          </div>
          <ButtonForSize buttonSizeRef={buttonSizeRef} />
        </div>
      )}
      <button
        ref={buttonAddToCartRef}
        className="bg-deepgrey mt-10 justify-center w-45 h-15 py-1.5 cursor-pointer font-bold text-lg text-warmwhite hover:text-xl hover:w-50"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
      {isNotSelected && (
        <p>
          Please choose required size!<span className="text-red">*</span>
        </p>
      )}
    </div>
  );
}

export default AddToCart;

/*function AddToCart({ item, selectedColorSrc, priceAfterDiscount }) {
  const {
    clickedSize,
    setClickedSize,
    isNotSelected,
    setIsNotSelected,
    sameCartItem,
    setSameCartItem,
    setAddedToCartSuccessfully,
  } = useChooseSize();
  const { isCurrentUser } = useCurrentUserEmail();
  const [quantity, setQuantity] = useState(0);
  const [pricePerQuantity, setPricePerQuantity] = useState(0);
  const { isCart, setIsCart } = useCartItems();
  const { colorSrc, setIsClickedImage } = useChangingColor();
  const { colorsAvailable, mainColorImage, secondColorGallery } =
    colorsAvailableFunction(item);
  //Detect which color should product have on image from cart
  const displayedImageInCart =
    colorSrc === ""
      ? selectedColorSrc === ""
        ? mainColorImage
        : selectedColorSrc
      : colorSrc;
  const chooseColor = secondColorGallery.includes(displayedImageInCart)
    ? colorsAvailable[1]
    : colorsAvailable[0];

  useEffect(() => {
    setIsClickedImage("");
  }, []);
  const buttonSizeRef = useRef(null);
  const buttonAddToCartRef = useRef(null);
  //Update cart related values from context api and add to cart table or update quantity of product from cart in case it is already in cart
  useEffect(() => {
    (async function insert() {
      if (!sameCartItem && sameCartItem !== "") {
        await insertCartItem(
          item.name,
          item.id,
          clickedSize,
          priceAfterDiscount,
          displayedImageInCart,
          chooseColor,
          isCurrentUser,
          localStorage.getItem("guestID")
        );
        const updatedArray = await getCartItems(
          isCurrentUser,
          localStorage.getItem("guestID")
        );
        setIsCart(updatedArray.length);
        setAddedToCartSuccessfully(true);
      }
      if (sameCartItem) {
        setPricePerQuantity(priceAfterDiscount * quantity);
        await updateCartQuantityColumn(
          item.name,
          clickedSize,
          displayedImageInCart,
          quantity,
          isCurrentUser,
          localStorage.getItem("guestID")
        );
        setAddedToCartSuccessfully(true);
      }
    })();
    (async function changePricePerQuantity() {
      if (pricePerQuantity > 0) {
        await updateCartPricePerQuantityColumn(
          item.name,
          clickedSize,
          pricePerQuantity,
          isCurrentUser,
          localStorage.getItem("guestID")
        );
      }
    })();
  }, [sameCartItem, clickedSize, quantity, pricePerQuantity]);

  //Reset to "" size for cart in case user clicked anywhere otside size button before adding to cart
  useEffect(() => {
    function handleClick(e) {
      if (buttonSizeRef.current === null) return;
      if (
        !Array.from(buttonSizeRef.current.parentNode.children).includes(
          e.target
        ) &&
        e.target !== buttonAddToCartRef.current
      ) {
        return setClickedSize("");
      }
    }
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  });
  //Load existing products from cart of active user
  useEffect(() => {
    async function loadCartItems() {
      const cartItems = await getCartItems(
        isCurrentUser,
        localStorage.getItem("guestID")
      );
      setIsCart(cartItems.length);
    }
    loadCartItems();
  }, [isCart, setIsCart]);
  //Add product to cart on click event/ update quantity if product with same criteria (size, color) already exists
  const handleAddToCart = async () => {
    const cartItems = await getCartItems(
      isCurrentUser,
      localStorage.getItem("guestID")
    );
    if (!clickedSize && item.itemType !== "accessories") setIsNotSelected(true);
    if (clickedSize || item.itemType === "accessories") {
      const isItemInCart = cartItems.filter((itemFiltered) => {
        return (
          item.id === itemFiltered.cart_id &&
          itemFiltered.size === clickedSize &&
          itemFiltered.selectedColorSrc === displayedImageInCart
        );
      });
      if (isItemInCart.length > 0) {
        setSameCartItem(true);
        setQuantity(isItemInCart[0].quantity + 1);
      } else {
        setSameCartItem(false);
      }
    }
  };
  return (
    <div className="flex flex-col items-start gap-1">
      {item.itemType === "accessories" ? null : (
        <div className="w-fit">
          <div className="flex mt-10 justify-between">
            <p className="text-left">Choose your size</p>
            <Drawer />
          </div>
          <ButtonForSize buttonSizeRef={buttonSizeRef} />
        </div>
      )}
      <button
        ref={buttonAddToCartRef}
        className="bg-deepgrey mt-10 justify-center w-45 h-15 py-1.5 cursor-pointer font-bold text-lg text-warmwhite hover:text-xl hover:w-50"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
      {isNotSelected && (
        <p>
          Please choose required size!<span className="text-red">*</span>
        </p>
      )}
    </div>
  );
}

export default AddToCart;
*/

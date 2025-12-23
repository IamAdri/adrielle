"use client";
import { redirect, usePathname } from "next/navigation";
import Button from "./Button";
import { useUpdateOrderPriceBox } from "../_customHooks/useUpdateOrderPriceBox";

function MakeOrderBox({ currentUser }) {
  const pathname = usePathname();
  const { totalProductsPrice, deliveryCost } = useUpdateOrderPriceBox();
  //Redirect to delivery/login page if user is/not loged in
  const handleGoToDelivery = () => {
    currentUser === "not loged in"
      ? redirect("/login")
      : pathname === "/bag"
      ? redirect("/delivery")
      : redirect("/bag");
  };
  return (
    <div className="border-2 border-lightlavender rounded-sm py-5 px-10 h-full">
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-xl">Order summary</h2>
        <div className=" flex flex-col items-start gap-3">
          <span>Product cost: {totalProductsPrice} EUR</span>
          <span>Delivery cost: {deliveryCost} EUR</span>
          <span className="font-bold text-lg">
            Total: {Number((totalProductsPrice + deliveryCost).toFixed(2))} EUR
          </span>
        </div>
        <div className="flex justify-center">
          <Button handleClick={handleGoToDelivery}>
            {pathname === "/bag" ? "Continue" : "Back to cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MakeOrderBox;

/*function MakeOrderBox({ currentUser }) {
  const pathname = usePathname();
  const { isCurrentUser } = useCurrentUserEmail();
  const { isCart } = useCartItems();
  const [itemsFromCart, setItemsFromCart] = useState([]);
  const [pricesOfItems, setPricesOfItems] = useState([]);
  const { totalProductsPrice, setTotalProductsPrice } = useCartItems();
  const [deliveryCost, setDeliveryCost] = useState(0);
  //Get cart items of active user
  useEffect(() => {
    (async function getItemsFromCart() {
      const items = await getCartItems(
        isCurrentUser,
        localStorage.getItem("guestID")
      );
      setItemsFromCart(items);
    })();
  }, [isCurrentUser, isCart]);
  //Update order box prices when making change in cart products and quantities
  useEffect(() => {
    const channel = supabase
      .channel("cart")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "cart",
        },
        (payload) => {
          setItemsFromCart((prev) => [
            payload.new,
            ...prev.filter((item) => item.id !== payload.new.id),
          ]);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [itemsFromCart]);
  //Create an array with prices per quantity of all products from cart
  useEffect(() => {
    let itemPrices = [];
    itemsFromCart.map((item) => {
      itemPrices.push(item.pricePerQuantity);
    });
    setPricesOfItems(itemPrices);
  }, [itemsFromCart]);
  //Sum up all prices of products from cart
  useEffect(() => {
    setTotalProductsPrice(
      Number(pricesOfItems.reduce((acc, curr) => acc + curr, 0).toFixed(2))
    );
  }, [pricesOfItems]);
  //Set delivery cost based on total price of cart products
  useEffect(() => {
    if (totalProductsPrice >= 200) {
      setDeliveryCost(0);
    } else {
      setDeliveryCost(25);
    }
  }, [totalProductsPrice]);
  //Redirect to delivery/login page if user is/not loged in
  const handleGoToDelivery = () => {
    currentUser === "not loged in"
      ? redirect("/login")
      : pathname === "/bag"
      ? redirect("/delivery")
      : redirect("/bag");
  };
  return (
    <div className="border-2 border-lightlavender rounded-sm py-5 px-10 h-full">
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-xl">Order summary</h2>
        <div className=" flex flex-col items-start gap-3">
          <span>Product cost: {totalProductsPrice} EUR</span>
          <span>Delivery cost: {deliveryCost} EUR</span>
          <span className="font-bold text-lg">
            Total: {Number((totalProductsPrice + deliveryCost).toFixed(2))} EUR
          </span>
        </div>
        <div className="flex justify-center">
          <Button handleClick={handleGoToDelivery}>
            {pathname === "/bag" ? "Continue" : "Back to cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MakeOrderBox;
*/

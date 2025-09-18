import Link from "next/link";
import {
  HeartIcon,
  HomeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import DropdownMenu from "./DropdownMenu";
import DisplayedNumberOfFavoriteItems from "./DisplayedNumberOfFavoriteItems";
import { auth } from "../_lib/auth";
import DisplayNumberOfCartItems from "./DisplayNumberOfCartItems";
import DarkModeButton from "./DarkModeButton";
import LogOutButton from "./LogOutButton";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

async function Navigation({ children }) {
  const session = await auth();
  const currentUser = session?.user.email || "not loged in";
  return (
    <div
      className={`fixed bg-nude top-0 right-0 left-0 z-100 flex  px-4 py-1.5  items-center justify-between flex-wrap  text-deepgrey 
       `}
    >
      <DropdownMenu />
      <div className="flex gap-8 items-center">
        <Link href="/">
          <HomeIcon className="size-7 text-deepgrey" />
        </Link>
        <div className="flex gap-0.5 items-center">
          <Link href="/favorites">
            <HeartIcon className="size-7 text-deepgrey" />
          </Link>
          <DisplayedNumberOfFavoriteItems currentUser={currentUser} />
        </div>
        <div className="flex gap-0.5 items-center">
          <Link href="/bag">
            <ShoppingBagIcon className="size-7 text-deepgrey" />
          </Link>
          <DisplayNumberOfCartItems currentUser={currentUser} />
        </div>
        <DarkModeButton />
        {children}
      </div>
    </div>
  );
}

export default Navigation;

/*
 const [scrollY, setScrollY] = useState(0);
  const { isCart, setIsCart } = useCartItems();
  const onScroll = useCallback((event) => {
    const { pageYOffset, scrollY } = window;
    setScrollY(window.pageYOffset);
  }, []);

  useEffect(() => {
    async function loadCartItems() {
      const cartItems = await getCartItems();
      setIsCart(cartItems.length);
    }
    loadCartItems();
  }, []);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, []);
*/
//${
//       scrollY > 0 ? "bg-nude border-none" : ""}

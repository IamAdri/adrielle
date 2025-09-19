import Link from "next/link";
import { signOutAction } from "../_lib/actions";
import LogOutButton from "./LogOutButton";

function AccountNavigationBar() {
  return (
    <div className="flex flex-col items-start w-50  gap-3 p-3 border-2 border-nude">
      <Link href="/account">My account</Link>
      <Link href="/account/delivery-details">Delivery details</Link>
      <Link href="/account/orders">My orders</Link>
      <Link href="/account/my-reviews">My reviews</Link>
      <form action={signOutAction}>
        <LogOutButton />
      </form>
    </div>
  );
}

export default AccountNavigationBar;

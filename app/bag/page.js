import { getShoesDetailsByCartTable } from "../_lib/data-service";
import DisplayCartItems from "../_components/DisplayCartItems";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "Cart",
};

async function Page() {
  const session = await auth();
  const currentUser = session?.user.email || "not loged in";
  const cartItems = await getShoesDetailsByCartTable(currentUser);
  return <DisplayCartItems cartItems={cartItems} />;
}

export default Page;

import { getCartItems, getShoesDetailsByCartTable } from "../_lib/data-service";
import DisplayCartItems from "../_components/DisplayCartItems";
import { auth } from "../_lib/auth";
import { supabase } from "../_lib/supabase";

export const metadata = {
  title: "Cart",
};

export const revalidate = 0;

async function Page() {
  const session = await auth();
  const currentUser = session?.user.email || "not loged in";
  // const cartItems = await getShoesDetailsByCartTable(currentUser);
  return <DisplayCartItems currentUser={currentUser} />;
}

export default Page;

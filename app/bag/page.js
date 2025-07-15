import { getShoesDetailsByCartTable } from "../_lib/data-service";
import DisplayCartItems from "../_components/DisplayCartItems";

export const metadata = {
  title: "Cart",
};

async function Page() {
  const cartItems = await getShoesDetailsByCartTable();
  return <DisplayCartItems cartItems={cartItems} />;
}

export default Page;

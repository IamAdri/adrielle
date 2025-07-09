import Image from "next/image";
import { getShoesDetailsByCartTable } from "../_lib/data-service";
import DisplayCartItems from "../_components/DisplayCartItems";

export const metadata = {
  title: "Cart",
};

async function Page() {
    const cartItems = await getShoesDetailsByCartTable();
  //const colorsAvailable = Object.keys(cartItem.variants);
  //console.log(cartItem);
  return (
    

        <DisplayCartItems cartItems={cartItems} />
  
  );
}

export default Page;

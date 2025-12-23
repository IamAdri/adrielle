import DisplayCartItems from "../_components/DisplayCartItems";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "Cart",
};

//export const revalidate = 0;

async function Page() {
  //Check if user is loged in
  const session = await auth();
  const currentUser = session?.user.email || "not loged in";

  return <DisplayCartItems currentUser={currentUser} />;
}

export default Page;

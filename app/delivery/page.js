import DeliveryDetailsDiv from "../_components/DeliveryDetailsDiv";
import MainHeading from "../_components/MainHeading";
import MakeOrderBox from "../_components/MakeOrderBox";
import OrderDetails from "../_components/OrderDetails";
import { auth } from "../_lib/auth";

async function Page() {
  const session = await auth();
  const currentUser = session?.user.email || "not loged in";

  return (
    <div className="flex flex-wrap justify-center gap-35">
      <OrderDetails sessionUser={currentUser} />
      <MakeOrderBox />
    </div>
  );
}

export default Page;

import MainHeading from "@/app/_components/MainHeading";
import { auth } from "@/app/_lib/auth";
import { getOrdersDetails } from "@/app/_lib/data-service";

async function Orders() {
  const session = await auth();
  const currentUser = session?.user.email || "not loged in";
  const ordersDetails = await getOrdersDetails(currentUser);
  console.log(ordersDetails);
  return (
    <div>
      <MainHeading>My orders</MainHeading>
      <div className="flex flex-col items-start gap-15">
        {ordersDetails.map((order) => {
          return (
            <div key={order.id} className="bg-lightnude p-3">
              <h2>Order No. {order.id} </h2>
              <h2>HEEEEEEEEEEE</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;

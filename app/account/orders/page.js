import MainHeading from "@/app/_components/MainHeading";
import ReviewAndRating from "@/app/_components/ReviewAndRating";
import { auth } from "@/app/_lib/auth";
import { getOrdersDetails, updateOrderStatus } from "@/app/_lib/data-service";
import Image from "next/image";

async function Orders() {
  const session = await auth();
  const currentUser = session?.user.email || "not loged in";
  const ordersDetails = await getOrdersDetails(currentUser);
  await updateOrderStatus(new Date().toLocaleDateString("en-CA"));
  return (
    <div>
      <MainHeading>My orders</MainHeading>
      <div className="flex flex-col items-start gap-15 mt-15">
        {ordersDetails.map((order) => {
          return (
            <div key={order.id} className="bg-lightnude p-5 w-200">
              <div className="flex justify-between">
                <h2 className="font-semibold">Order No. {order.id} </h2>
                <ul className="flex gap-3">
                  <li className="text-coolgrey">Sent: {order.created_at}</li>
                  <li className="text-coolgrey">
                    {order.status === "processing"
                      ? order.status
                      : `Delivered: ${order.deliveryDate}`}
                  </li>
                  <li className="text-coolgrey">
                    {order.paymentMethod === "cashPayment"
                      ? "Cash at delivery"
                      : "Card at delivery"}
                  </li>
                </ul>
              </div>
              {order.products.map((product) => {
                return (
                  <div
                    key={`${product.name},${product.size}, ${product.color}`}
                    className="flex gap-10 mt-5 items-center"
                  >
                    <div className="w-[100px] h-[100px]">
                      <Image
                        src={product.image}
                        width={100}
                        height={100}
                        alt="Image of ordered product"
                      />
                    </div>

                    <ul className="flex flex-col items-start">
                      <li className="font-medium">{product.name}</li>
                      <li>
                        size:{" "}
                        <span className="font-medium">{product.size}</span>
                      </li>
                      <li>
                        color:{" "}
                        <span className="font-medium">{product.color}</span>
                      </li>
                      <li>
                        quantity:{" "}
                        <span className="font-medium">{product.quantity}</span>
                      </li>
                      <li>
                        total price:{" "}
                        <span className="font-medium">{order.totalPrice}</span>{" "}
                        EUR
                      </li>
                    </ul>
                    <ReviewAndRating
                      productName={product.name}
                      productImage={product.image}
                      currentUser={currentUser}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;

import Link from "next/link";
import MainHeading from "../_components/MainHeading";

function page() {
  return (
    <div className="mt-25">
      <MainHeading>Order has been sent successfully!🎉🎉🎉</MainHeading>
      <div className="flex gap-15 justify-center mt-10 font-medium underline ">
        <Link className="hover:text-lavenderhighlight" href="/">
          Go back to shopping
        </Link>
        <Link className="hover:text-lavenderhighlight" href="/account/orders">
          See order details
        </Link>
      </div>
    </div>
  );
}

export default page;

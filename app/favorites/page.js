import DisplayFavoriteItems from "../_components/DisplayFavoriteItems";
import MainHeading from "../_components/MainHeading";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "Favorites",
};

async function Page() {
  const session = await auth();
  const currentUser = session?.user.email || "not loged in";
  return (
    <div className="mt-5">
      <MainHeading className="font-bold text-xl">Favorites items</MainHeading>
      <DisplayFavoriteItems currentUser={currentUser} />
    </div>
  );
}

export default Page;

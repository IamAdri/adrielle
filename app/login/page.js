import MainHeading from "../_components/MainHeading";
import { signInAction } from "../_lib/actions";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../_lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login",
};

async function Page() {
  const session = await auth();
  // console.log(session);
  if (session?.user) {
    redirect("/account");
  }
  return (
    <>
      {session === null && (
        <form
          action={signInAction}
          className="flex flex-col items-center m-auto gap-5 w-fit mt-15"
        >
          <MainHeading>Welcome!</MainHeading>
          <p className="mt-5">Please log in to join us or sign in.</p>
          <button className="flex items-center gap-1.5 bg-warmwhite border border-coolgrey px-3 py-1.5 cursor-pointer">
            <FcGoogle size={25} />
            <span>Continue with Google</span>
          </button>
        </form>
      )}
    </>
  );
}

export default Page;

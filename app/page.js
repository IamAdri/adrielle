import { Playfair_Display } from "next/font/google";
import HomepageImages from "./_components/HomepageImages";
import { auth } from "./_lib/auth";
import SessionLocalStorage from "./_components/SessionLocalStorage";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
});

export default async function Page() {
  const session = await auth();
  console.log(session);
  const currentUser = session?.user.email || "not loged in";
  return (
    <div>
      <h1
        className={`text-deepgrey ${playfairDisplay.className} font-bold text-2xl mb-5 mt-5 `}
      >
        Step into <span className="text-lavenderhighlight">elegance</span>.
      </h1>
      <p className="text-deepgrey mx-15">
        Discover timeless designs, crafted for confident women. From heels to
        flats — style begins here.
      </p>
      <SessionLocalStorage currentUser={currentUser} />
      <HomepageImages />
    </div>
  );
}

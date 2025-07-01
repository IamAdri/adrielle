import { Playfair_Display } from "next/font/google";
import HomepageImages from "./_components/HomepageImages";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
});

export default function Page() {
  return (
    <div>
      <h1
        className={`text-deepgrey ${playfairDisplay.className} font-bold text-2xl mb-5 `}
      >
        Step into <span className="text-lavenderhighlight">elegance</span>.
      </h1>
      <h3 className="text-deepgrey">
        Discover timeless designs, crafted for confident women. From heels to
        flats — style begins here.
      </h3>
      <HomepageImages />
    </div>
  );
}

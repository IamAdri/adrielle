import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import newCollectionsHomepage from "@/public/newCollectionsHomepage.jpg";
import Link from "next/link";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
});

export default function Page() {
  return (
    <div>
      <h1
        className={`text-deepgrey ${playfairDisplay.className} font-bold text-2xl mb-5`}
      >
        Step into <span className="text-lavenderhighlight">elegance</span>.
      </h1>
      <h3 className="text-deepgrey">
        Discover timeless designs, crafted for confident women. From heels to
        flats — style begins here.
      </h3>
      <div className="p-10 flex justify-center">
        <div className="group relative ">
          <Image
            src={newCollectionsHomepage}
            width={1350}
            placeholder="blur"
            alt="An elegant pair of heels."
            className="rounded-xl shadow-xl"
          />
          <div className="absolute top-0 left-0 w-[1350px] h-0 flex flex-col justify-center items-center bg-neutral-100 opacity-0 group-hover:h-full group-hover:opacity-75 duration-500">
            <Link
              href="/newCollection"
              className="bg-deepgrey text-warmwhite px-15 py-5 hover:bg-gray-950 hover:text-xl"
            >
              New collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

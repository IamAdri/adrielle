import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import newCollectionsHomepage from "@/public/newCollectionsHomepage.jpg";
import sport from "@/public/sport.jpg"
import sandals from "@/public/sandals.jpg"
import flats from "@/public/flats.jpg"
import heels from "@/public/heels.jpg"
import bracelet from "@/public/bracelet.jpg"
import bag from "@/public/bag.jpg"
import necklace from "@/public/necklace.jpg"
import belt from "@/public/belt.jpg"
import Link from "next/link";
import OverlayOnHover from "./_components/OverlayOnHover";

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
        <OverlayOnHover category="newCollection" width={1350} height={1350} px="15" py="5" alt="An elegant pair of heels." />
        {/*<div className="group relative ">
          <Image
            src={newCollectionsHomepage}
            width={1350}
            placeholder="blur"
            alt="An elegant pair of heels."
            className="rounded-xl shadow-xl"
          />
          <div className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-neutral-100 opacity-0 group-hover:h-full group-hover:opacity-75 duration-500">
            <Link
              href="/newCollection"
              className="bg-deepgrey text-warmwhite px-15 py-5 hover:bg-gray-950 hover:text-xl"
            >
              New collection
            </Link>
          </div>
        </div>*/}
      </div>
      <div className="grid grid-flow-col grid-rows-2 justify-center gap-5">
        <OverlayOnHover category="shoes" srcName="heels" alt="A pair of heels shoes" />
        <OverlayOnHover category="accessories" srcName="bracelet" alt="A bracelet" />
        <OverlayOnHover category="shoes" srcName="sport" alt="A pair of sport shoes" />
        <OverlayOnHover category="accessories" srcName="bag" alt="A bag" />
        <OverlayOnHover category="shoes" srcName="sandals" alt="A pair of sandals" />
        <OverlayOnHover category="accessories" srcName="necklace" alt="A necklace" />
        <OverlayOnHover category="shoes" srcName="flats" alt="A pair of flats" />
        <OverlayOnHover category="accessories" srcName="belt" alt="A belt" />
      </div>
    </div>
  );
}

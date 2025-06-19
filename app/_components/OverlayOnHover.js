import Image from "next/image";
import Link from "next/link";


function OverlayOnHover({srcName="newCollectionsHomepage", alt, category, width=300, height=300, px=10, py=2}) {
  return(
        <div className="group relative">
          <Image src={`/${srcName}.jpg`} height={height} width={width} placeholder="blur" blurDataURL="..." alt={alt} className="rounded-xl shadow-xl"/>
          <div className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-neutral-100 opacity-0 group-hover:h-full group-hover:opacity-75 duration-500">
            <Link href={`/${category}/${srcName}`} className={`bg-deepgrey text-warmwhite px-${px} py-${py} hover:bg-gray-950 hover:text-xl`}>{srcName}</Link>
          </div>
          
        </div>
  ) 
}
/*
<div className="p-10 flex justify-center">
        <div className="group relative ">
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
        </div>
      </div>
*/
export default OverlayOnHover;

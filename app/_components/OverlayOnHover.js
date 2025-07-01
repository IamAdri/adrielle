import Image from "next/image";
import Link from "next/link";

function OverlayOnHover({
  srcName = "newCollectionsHomepage",
  alt,
  category,
  width = 300,
  height = 300,
}) {
  return (
    <div className="group relative">
      <Image
        src={`/${srcName}.jpg`}
        height={height}
        width={width}
        placeholder="blur"
        blurDataURL="..."
        alt={alt}
        className="rounded-xl shadow-xl"
      />
      <div className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-neutral-100 opacity-0 group-hover:h-full group-hover:opacity-75 duration-500">
        <Link
          href={
            category === "newCollection"
              ? `/${category}`
              : `/${category}/${srcName}`
          }
          className={`bg-deepgrey text-warmwhite px-15 py-5 hover:bg-gray-950 hover:text-xl`}
        >
          {category === "newCollection"
            ? "New collection"
            : srcName.charAt(0).toUpperCase() + srcName.slice(1)}
        </Link>
      </div>
    </div>
  );
}

export default OverlayOnHover;

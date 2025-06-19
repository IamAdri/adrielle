function safe() {
  const shoesSection = useRef(null);
  const accessoriesSection = useRef(null);

  const showDropdownMenu = () => {
    shoesSection.current.className = "block";
  };

  const hideDropDownMenu = () => {
    shoesSection.current.className = "hidden";
    accessoriesSection.current.className = "hidden";
  };
  return (
    <div className="flex gap-8 items-center" onMouseLeave={hideDropDownMenu}>
      <Image src="/logo.png" width="75" height="75" alt="Logo" />
      <div>
        <button
          onMouseOver={showDropdownMenu}
          className="hover:bg-lightlavender px-4 py-2 rounded-xl cursor-pointer"
        >
          <Link href="/shoes">Shoes</Link>
        </button>
        <div className="hidden" ref={shoesSection}>
          <ul className="flex flex-col absolute mt-4 bg-lavender p-2 text-center rounded-sm">
            <Link
              href="/shoes/sport"
              className="hover:bg-lightlavender hover:w-full hover:rounded-sm hover:text-purple-800 hover:p-1"
            >
              Sport
            </Link>
            <Link
              href="/shoes/elegant"
              className="hover:bg-lightlavender hover:w-full hover:rounded-sm hover:text-purple-800 hover:p-1"
            >
              Elegant
            </Link>
            <Link
              href="/shoes/summer"
              className="hover:bg-lightlavender hover:w-full hover:rounded-sm hover:text-purple-800 hover:p-1"
            >
              Summer
            </Link>
          </ul>
        </div>
      </div>
      <div>
        <button
          onMouseOver={() => (accessoriesSection.current.className = "block")}
          className="hover:bg-lightlavender px-4 py-2 rounded-xl cursor-pointer"
        >
          <Link href="/accessories">Accessories</Link>
        </button>
        <div className="hidden" ref={accessoriesSection}>
          <ul className="flex flex-col absolute mt-4 bg-lavender p-2 text-center rounded-sm">
            <Link
              href="/accessories/necklaces"
              className="hover:bg-lightlavender hover:w-full hover:rounded-sm hover:text-purple-800 hover:p-1"
            >
              Necklaces
            </Link>
            <Link
              href="/accessories/bags"
              className="hover:bg-lightlavender hover:w-full hover:rounded-sm hover:text-purple-800 hover:p-1"
            >
              Bags
            </Link>
            <Link
              href="/accessories/bracelets"
              className="hover:bg-lightlavender hover:w-full hover:rounded-sm hover:text-purple-800 hover:p-1"
            >
              Bracelets
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default safe;

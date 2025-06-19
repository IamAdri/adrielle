import Link from "next/link";

function DropdownButton({ showDropdownMenu, mainRoot }) {
  return (
    <button
      onMouseOver={showDropdownMenu}
      className="hover:bg-lightlavender px-4 py-2 rounded-xl cursor-pointer"
    >
      <Link href={`/${mainRoot}`}>
        {mainRoot.charAt(0).toUpperCase() + mainRoot.slice(1)}
      </Link>
    </button>
  );
}

export default DropdownButton;

import Link from "next/link";

function DropdownMenu() {
  return (
    <div className="flex flex-col absolute mt-2.5 bg-lightlavender p-3 z-10">
      <Link href="/shoes/sport" className="block">
        Sport
      </Link>
      <Link href="/shoes/elegant">Elegant</Link>
      <Link href="/shoes/summer">Summer</Link>
    </div>
  );
}

export default DropdownMenu;

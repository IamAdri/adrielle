"use client";

import { useState } from "react";
import SizeGuideTable from "./SizeGuideTable";

function Drawer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="justify-center w-fit">
      <button className="hover:cursor-pointer" onClick={toggleDrawer}>
        Size Guide
      </button>

      <div
        className={`flex flex-col items-end fixed top-70 right-0 w-fit h-fit p-1 bg-white opacity-95 shadow-lg
                transition-transform transform ${
                  isOpen ? "-translate-x-30" : "translate-x-full"
                }`}
      >
        <button
          className="border px-2 justify-center mb-2 rounded-full hover:cursor-pointer"
          onClick={toggleDrawer}
        >
          x
        </button>
        <div className="">
          <SizeGuideTable />
        </div>
      </div>
    </div>
  );
}

export default Drawer;

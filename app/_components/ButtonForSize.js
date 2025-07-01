"use client";
function ButtonForSize({ children }) {
  return (
    <button className="border border-grey hover:border-deepgrey hover:cursor-pointer py-2 px-3">
      {children}
    </button>
  );
}

export default ButtonForSize;

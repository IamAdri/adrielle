function Button({ children, handleClick = null }) {
  return (
    <button
      className="flex items-center bg-darklavender text-white py-1.5 px-3 rounded-sm cursor-pointer hover:bg-lavenderhighlight"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;

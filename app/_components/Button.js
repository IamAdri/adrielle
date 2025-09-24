function Button({ children, handleClick = null, disabled = false }) {
  return (
    <button
      disabled={disabled}
      className={`flex items-center bg-darklavender text-white py-1.5 px-3 rounded-sm  hover:bg-lavenderhighlight ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;

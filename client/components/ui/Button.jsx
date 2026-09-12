export default function Button({
  children,
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-5
        py-3
        rounded-xl
        bg-gradient-to-r
        from-indigo-500
        to-blue-600
        text-white
        font-semibold
        shadow-md
        hover:scale-105
        hover:shadow-xl
        transition-all
        duration-300
        cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
}
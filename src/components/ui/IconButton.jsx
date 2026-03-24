import React from "react";

const IconButton = ({
  icon: Icon,
  onClick,
  size = 24,
  active = false,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        p-2 rounded-full transition 
        hover:bg-gray-800 
        ${active ? "text-red-500" : "text-white"}
        ${className}
      `}
    >
      <Icon size={size} />
    </button>
  );
};

export default IconButton;

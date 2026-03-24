import React from "react";

const CategoryItem = ({
  image,
  name,
  active = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center w-20 cursor-pointer"
    >
      {/* Circular Image */}
      <div
        className={`
          p-0.5 rounded-full transition w-18 h-18
          ${active 
            ? "bg-linear-to-tr from-yellow-400 to-pink-500"
            : "bg-gray-700"
          }
        `}
      >
        <img
          src={image}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-full h-full rounded-full object-cover bg-background p-0.5"
        />
      </div>

      {/* Category Name */}
      <span className="text-xs mt-2 text-center truncate w-full">
        {name}
      </span>
    </div>
  );
};

export default CategoryItem;

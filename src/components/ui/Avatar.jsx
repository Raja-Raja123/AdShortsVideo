import React from "react";

const Avatar = ({
  src,
  alt = "avatar",
  size = "md",
  hasStory = false,
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  };

  return (
    <div>
      <img
        src={src}
        alt={alt}
        className={`
          rounded-full object-cover 
          ${sizeClasses[size]}
          ${hasStory ? "bg-black p-[2px]" : ""}
        `}
      />
    </div>
  );
};

export default Avatar;

import React from "react";

const Input = ({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full bg-transparent outline-none 
        text-sm text-white
        ${className}
      `}
    />
  );
};

export default Input;

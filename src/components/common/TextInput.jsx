import React from "react";
import { CiSearch } from "react-icons/ci"

const TextInput = ({ value, placeholder, appendIcon, inputChange, enter, className, size, type, onFocus, onBlur, inputClassName }) => {
  const onEnter = e => {
    if (e.key === "Enter" && enter) {
      enter(e.target.value);
    }
  };

  const onInputChange = e => {
    if (inputChange) {
      inputChange(e.target.value);
    }
  };

  return (
    <div className={`relative ${className || ""}`}>
      <input
        type="text"
        value={value}
        className={`w-full  ${size === "small" ? "py-1" : "py-3"} px-4 rounded-md border-none pr-8 ${inputClassName}`}
        placeholder={placeholder}
        onChange={onInputChange}
        onKeyDown={onEnter}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {appendIcon === "search" && <CiSearch size={24} className="absolute right-2 top-1/2 transform -translate-y-1/2" />}
    </div>
  );
};

export default TextInput;

import React from "react";
import { CiSearch } from "react-icons/ci"

const TextInput = ({ value, placeholder, appendIcon, inputChange, enter, className, size, type }) => {
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
    <div className={`relative ${className || ''}`}>
      <input
        type='text'
        className={`w-full  ${size === 'small' ? 'py-1' : 'py-3'} px-4 rounded-md border-none pr-8`}
        placeholder={placeholder}
        onChange={onInputChange}
        onKeyDown={onEnter}
        value={value}
      />
      {appendIcon === "search" && <CiSearch size={24} className="absolute right-2 top-1/2 transform -translate-y-1/2" />}
    </div>
  );
};

export default TextInput;

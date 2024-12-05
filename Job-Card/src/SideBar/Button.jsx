import React from 'react';

const Button = ({ onClickHandler = () => {}, value, title, className = '', ariaLabel }) => {
  return (
    <button
      onClick={onClickHandler}
      value={value}
      className={`px-4 py-1 border text-base hover:bg-orange-600 hover:text-white ${className}`}
      aria-label={ariaLabel || title} // Fallback to title if ariaLabel is not provided
    >
      {title}
    </button>
  );
};

export default Button;

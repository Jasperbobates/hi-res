import React from "react";

const Button = ({ children, type, onClick, classes }) => {
  // you can remove useTheme here if it's only for colors
  if (type === "primary") {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`
          text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg
          bg-black text-white dark:bg-white dark:text-black
          transition-all duration-300 ease-out first:ml-0
          hover:scale-105 active:scale-100
          ${classes || ""}
        `}
      >
        {children}
      </button>
    );
  }

  // Default button style
  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg
        flex items-center
        justify-start tablet:justify-center
        text-black hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700
        transition-all duration-300 ease-out hover:scale-105 active:scale-100
        tablet:first:ml-0
        ${classes || ""}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
import React from "react";

const OrDivider = () => {
  return (
    <div className="relative flex items-center justify-center w-full">
      <hr className="w-full h-px my-10 bg-gray-200 border-0 dark:bg-gray-700" />
      <span className="absolute px-3 font-medium text-gray-500 bg-white dark:text-gray-400 dark:bg-gray-900">
        or
      </span>
    </div>
  );
};

export default OrDivider;

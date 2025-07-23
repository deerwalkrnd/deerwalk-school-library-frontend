import React from "react";

const OrDivider = () => {
  return (
    <div className="inline-flex items-center justify-center w-full">
      <hr className="w-full h-px my-10 bg-gray-200 border-2 dark:bg-gray-700" />
      <span className="absolute px-3 font-medium text-gray-300 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-300">
        or
      </span>
    </div>
  );
};

export default OrDivider;

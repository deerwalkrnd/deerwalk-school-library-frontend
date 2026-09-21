import React from "react";

const OrDivider = () => {
  return (
    <div className="relative flex items-center justify-center w-full">
      <hr className="w-full h-px my-10 bg-gray-200 border-0" />
      <span className="absolute px-3 font-medium text-gray-500 bg-white">
        or
      </span>
    </div>
  );
};

export default OrDivider;

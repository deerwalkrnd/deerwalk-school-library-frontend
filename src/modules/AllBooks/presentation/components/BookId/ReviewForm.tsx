import { Avatar } from "@/core/presentation/components/ui/avatar";
import { Input } from "@/core/presentation/components/ui/input";
import React, { useState } from "react";

const ReviewForm = () => {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-row gap-2 justify-center items-center ">
      <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold"></div>{" "}
      <Input
        type="text"
        placeholder="Add a review..."
        className="border-0 border-b border-gray-300 focus:border-black focus:ring-0 rounded-none shadow-none placeholder-gray-400"
      />
    </div>
  );
};

export default ReviewForm;

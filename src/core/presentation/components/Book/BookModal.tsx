import Image from "next/image";
import React from "react";

const BookModal = () => {
  return (
    <div className="">
      <div className="bg-white shadow-md shadow-black flex justify-center">
        <div></div>
        <Image src="/file.svg" alt="book" width={200} height={300} />
      </div>
      <div>
        <h3>{"title"}</h3>
        <h4>{"author"}</h4>
      </div>
    </div>
  );
};

export default BookModal;

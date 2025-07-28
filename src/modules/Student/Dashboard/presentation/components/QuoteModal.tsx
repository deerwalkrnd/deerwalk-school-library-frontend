import React from "react";

const QuoteModal = () => {
  const quoteBy = "Balti";
  const quote = "Do the work innit";
  return (
    <div className="border-[rgba(234,93,14,0.2)] border-[1px] mb-10 bg-secondary p-6 rounded-lg flex flex-col items-start gap-y-7">
      <div>
        <h1 className="text-2xl  md:text-4xl font-semibold">
          Quote of the Day
        </h1>
      </div>
      <div className="flex flex-col justify-end items-start gap-6 self-stretch">
        <span className="text-base md:text-lg lg:text-xl font-medium italic leading-[1.4]">{`"${quote}"`}</span>
        <div className="md:text-lg lg:text-xl font-medium">
          {"- "}
          {quoteBy}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;

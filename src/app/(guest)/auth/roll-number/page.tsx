import RollNoForm from "@/modules/Authentication/presentation/components/rollNoForm";
import React from "react";

const page = () => {
  return (
    <div className="">
      <div className="h-full min-h-screen flex flex-col gap-5  mx-auto p-6 justify-center md:items-center ">
        <div className="mb-5 flex flex-col gap-2">
          <h1 className="font-semibold text-center text-3xl md:text-4xl leading-[1] ">
            Almost there...{" "}
          </h1>
          <p className="text-sm font-medium mt-2 text-center  mx-auto">
            Enter your DSS roll number to get access to the library{" "}
          </p>
        </div>

        <RollNoForm />
      </div>
    </div>
  );
};

export default page;

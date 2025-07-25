import ResetForm from "@/modules/Authentication/presentation/components/resetForm";
import React from "react";

const page = () => {
  return (
    <div className="">
      <div className="h-full min-h-screen flex flex-col gap-5  mx-auto p-6 justify-center md:items-center ">
        <div className="mb-5 flex flex-col gap-2">
          <h1 className="font-semibold text-center text-3xl md:text-4xl leading-[1] ">
            Reset Password
          </h1>
          <p className="text-sm mt-2 text-center font-medium  mx-auto">
            Enter your email to get a password reset link.
          </p>
        </div>

        <ResetForm />
      </div>
    </div>
  );
};

export default page;

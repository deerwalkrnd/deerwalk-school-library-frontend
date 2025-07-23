import OrDivider from "@/core/presentation/components/Divider/OrDivider";
import LoginForm from "@/modules/Authentication/presentation/components/loginForm";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col p-6">
      <div className="h-full min-h-screen flex flex-col justify-center ">
        <div className="mb-10 ">
          <h1 className="font-semibold text-center text-2xl md:text-3xl leading-normal ">
            Welcome To DSS Library
          </h1>
          <p className=" text-xs mt-2 text-center font-medium  mx-auto">
            Sign in to the DSS Library to explore a vast collection of knowledge
            and resources.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default page;

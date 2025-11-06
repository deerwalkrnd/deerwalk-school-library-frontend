"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/core/presentation/contexts/AuthContext";
import { PageTransitionLoader } from "@/core/presentation/components/ui/PageTransitionLoader";
import LoginHero from "@/core/presentation/assets/images/LoginHero";
import LoginForm from "@/modules/Authentication/presentation/components/loginForm";

const page = () => {
  const { isAuthenticated, isLoading, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading || !isAuthenticated) {
      return;
    }

    const destination =
      role === "LIBRARIAN" ? "/librarian/dashboard" : "/student/dashboard";
    router.replace(destination);
  }, [isAuthenticated, isLoading, role, router]);

  if (isLoading || isAuthenticated) {
    return <PageTransitionLoader />;
  }

  return (
    <div className="flex flex-row lg:justify-between">
      <div className="h-full min-h-screen flex flex-col   p-6 justify-center mx-auto">
        <div className="mb-10">
          <h1 className="font-semibold text-center text-3xl md:text-4xl leading-normal ">
            Welcome To DSS Library
          </h1>
          <p className=" text-sm mt-2 text-center font-medium  mx-auto">
            Sign in to the DSS Library to explore a vast collection of knowledge
            and resources.
          </p>
        </div>

        <LoginForm />
      </div>
      <div className="hidden lg:block">
        <LoginHero />
      </div>
    </div>
  );
};

export default page;

"use client";

import StudentProfile from "@/modules/StudentProfile/presentation/components/StudentProfile";
import { useStudentProfile } from "@/modules/StudentProfile/application/studentProfileUseCase";
import LoadingState from "@/modules/StudentProfile/presentation/components/LoadingState";
import ErrorState from "@/modules/StudentProfile/presentation/components/ErrorState";

const Page = () => {
  const { data, isLoading, isError, error } = useStudentProfile();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-9xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">Your Profile</h2>
            <p className="text-base font-medium text-[#5A5858]">
              View and Manage Your Library Profile
            </p>
          </div>

          {isLoading && <LoadingState />}
          {isError && (
            <ErrorState message={error?.message || "Unknown error"} />
          )}
          {!isLoading && !isError && !data && (
            <div className="text-center text-lg text-gray-600 py-16">
              No Profile Data Available
            </div>
          )}
          {data && <StudentProfile profileData={data} />}
        </div>
      </div>
    </div>
  );
};

export default Page;

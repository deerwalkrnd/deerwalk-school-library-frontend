"use client";

import { useStudentProfile } from "@/modules/Student/StudentProfile/application/studentProfileUseCase";
import ErrorState from "@/modules/Student/StudentProfile/presentation/components/ErrorState";
import LoadingState from "@/modules/Student/StudentProfile/presentation/components/LoadingState";
import StudentProfile from "@/modules/Student/StudentProfile/presentation/components/StudentProfile";

const Page = () => {
  const { data: profileData, isLoading, isError, error } = useStudentProfile();
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-9xl mx-auto">
          <div className="mb-8">
            <h2 className="lg:text-3xl sm:text-2xl font-semibold mb-2">
              Your Profile
            </h2>
            <p className="lg:text-base text-sm font-weight-medium text-gray">
              View and Manage Your Library Profile
            </p>
          </div>

          {isLoading && <LoadingState />}
          {isError && (
            <ErrorState message={error?.message || "Unknown error"} />
          )}
          {!isLoading && !isError && !profileData && (
            <div className="text-center text-lg text-gray py-16">
              No Profile Data Available
            </div>
          )}
          {profileData && <StudentProfile profileData={profileData} />}
        </div>
      </div>
    </div>
  );
};

export default Page;

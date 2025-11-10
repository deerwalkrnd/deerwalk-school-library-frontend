"use client";

import { useStudentProfile } from "@/modules/Student/StudentProfile/application/studentProfileUseCase";
import ErrorState from "@/modules/Student/StudentProfile/presentation/components/ErrorState";
import LoadingState from "@/modules/Student/StudentProfile/presentation/components/LoadingState";
import StudentProfile from "@/modules/Student/StudentProfile/presentation/components/StudentProfile";

const Page = () => {
  const { data: profileData, isLoading, isError, error } = useStudentProfile();
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 lg:pt-10 pb-12 space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2">
            Your Profile
          </h2>
          <p className="text-sm sm:text-base font-weight-medium text-gray">
            View and Manage Your Library Profile
          </p>
        </div>

        {isLoading && <LoadingState />}
        {isError && <ErrorState message={error?.message || "Unknown error"} />}
        {!isLoading && !isError && !profileData && (
          <div className="text-center text-lg text-gray py-16">
            No Profile Data Available
          </div>
        )}
        {profileData && <StudentProfile profileData={profileData} />}
      </div>
    </div>
  );
};

export default Page;

"use client";

import StudentProfile from "@/modules/StudentProfile/presentation/components/StudentProfile";
import { useStudentProfile } from "@/modules/StudentProfile/application/studentProfileUseCase";

const Page = () => {
  const { data, isLoading, isError, error } = useStudentProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className=" px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-2">Your Profile</h2>
              <p className="text-base font-medium text-[#5A5858]">
                View and Manage Your Library Profile
              </p>
            </div>
            <div className="flex items-center justify-center py-16">
              <div className="text-center text-lg text-gray-600">
                Loading profile...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-2">Your Profile</h2>
              <p className="text-base font-medium text-[#5A5858]">
                View and Manage Your Library Profile
              </p>
            </div>
            <div className="flex items-center justify-center py-16">
              <div className="text-center text-lg text-red-500">
                Error loading Profile: {error?.message}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-2">Your Profile</h2>
              <p className="text-base font-medium text-[#5A5858]">
                View and Manage Your Library Profile
              </p>
            </div>
            <div className="flex items-center justify-center py-16">
              <div className="text-center text-lg text-gray-600">
                No Profile Data Available
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-9xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">Your Profile</h2>
            <p className="text-base font-medium text-[#5A5858]">
              View and Manage Your Library Profile
            </p>
          </div>
          <StudentProfile profileData={data} />
        </div>
      </div>
    </div>
  );
};

export default Page;

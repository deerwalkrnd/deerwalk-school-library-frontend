'use client'

import StudentProfile from "@/modules/StudentProfile/presentation/components/StudentProfile";
import { useStudentProfile } from "@/modules/StudentProfile/application/studentProfileUseCase";
import React from "react";

const page = () => {
  const { data, isLoading, isError, error } = useStudentProfile();

  if (isLoading) {
    return (
      <div className="p-8">
        <h2 className="text-3xl font-[600]">Your Profile</h2>
        <h1>View and Manage Your Library Profile </h1>
        <div className="m-8">Loading profile...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <h2 className="text-3xl font-[600]">Your Profile</h2>
        <h1 className="text-base font-[500] text-[#5A5858">
          View and Manage Your Library Profile{" "}
        </h1>
        <div className="m-8">Error loading Profile: ${error?.message} </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8">
        <h2 className="text-3xl font-[600]">Your Profile</h2>
        <h1 className="text-base font-[500] text-[#5A5858]">
          View and Manage Your Library Profile{" "}
        </h1>
        <div className="m-8">No Profile Data Available</div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-8">
        <h2 className="text-3xl font-[600]">Your Profile</h2>
        <h1 className="text-base font-[500] text-[#5A5858">
          View and Manage Your Library Profile{" "}
        </h1>
      </div>
      <div>
        <StudentProfile
          name={data.name}
          email={data.email}
          avatarUrl={data?.avatarUrl}
        />
      </div>
    </div>
  );
};

export default page;

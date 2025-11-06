"use client";
import type React from "react";
import type { StudentProfileData } from "../../domain/entities/studentProfileEntity";
import { ProfileHeader } from "./StudentProfile/ProfileHeader";
import { TabNavigation } from "./StudentProfile/TabNavigation";
import { TabContent } from "./StudentProfile/TabContent";
import { useStudentProfileTabs } from "../hooks/useStudentProfileTabs";

interface StudentProfileProps {
  profileData: StudentProfileData;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ profileData }) => {
  const { activeTab, currentPage, setCurrentPage, handleTabChange } =
    useStudentProfileTabs();

  const {
    uuid,
    name,
    email,
    avatarUrl,
    userMedatadata,
    avatarFallBack,
    currentlyReading,
    borrowedHistory,
    totalBooksBorrowed,
    totalReturnedBooks,
    fineLevied,
  } = profileData;

  return (
    <div className="flex flex-col w-full h-full mx-auto gap-4 p-4">
      <ProfileHeader
        uuid={uuid}
        name={name}
        email={email}
        userMedatadata={userMedatadata}
        avatarUrl={avatarUrl}
        avatarFallBack={avatarFallBack}
      />
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="w-full">
        <TabContent
          activeTab={activeTab}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          currentlyReading={currentlyReading}
          borrowedHistory={borrowedHistory}
          totalBooksBorrowed={totalBooksBorrowed}
          totalReturnedBooks={totalReturnedBooks}
          fineLevied={fineLevied}
        />
      </div>
    </div>
  );
};

export default StudentProfile;

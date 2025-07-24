import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/core/presentation/components/ui/avatar";

interface StudentProfileProps {
  name: string;
  email: string;
  avatarUrl?: string;
  avatarFallback?: string;
}

const StudentProfile: React.FC<StudentProfileProps> = ({
  name,
  email,
  avatarUrl,
  avatarFallback,
}) => {
  return (
    <div className="flex flex-col w-[489px] h-[186px]  m-8 gap-4 justify-center items-start">
      <div className="w-full h-full">
        <Avatar className="w-[100px] h-[100px] ">
          <AvatarImage
            src={avatarUrl || "/placeholder.svg"}
            alt={`Avatar of ${name}`}
          />
          <AvatarFallback>
            {avatarFallback ||
             (() => {
              const nameParts = name.split(" ")
              const firstNameInitial = nameParts[0] ? nameParts[0].charAt(0).toUpperCase() : ""
              const lastNameInitial = nameParts.length > 1? nameParts[nameParts.length - 1].charAt(0).toUpperCase() : ""
              return `${firstNameInitial}${lastNameInitial}`
            }) ()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-row gap-48px w-full h-full">
        {" "}
        <div className="flex flex-col w-full h-full">
          <h1 className="text-base text-[#5A5858]">Name</h1>
          <h1 className="text-xl font-[500]">{name}</h1>
        </div>
        <div className="flex flex-col w-full h-full">
          <h1 className="text-base text-[#5A5858]">StudentID/Email</h1>
          <h1 className="text-xl font-[500]">{email}</h1>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

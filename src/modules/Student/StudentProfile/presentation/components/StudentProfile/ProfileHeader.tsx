import React from "react";
import { Button } from "@/core/presentation/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/core/presentation/components/ui/avatar";
import { useAvatarFallback } from "../../hooks/useAvatarFallback";

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatarUrl?: string;
  avatarFallBack?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  email,
  avatarUrl,
  avatarFallBack,
}) => {
  const fallback = useAvatarFallback(name, avatarFallBack);

  return (
    <div className="flex flex-col w-full md:w-[489px] h-full mx-auto md:m-8 gap-4 justify-center items-start p-4">
      <div className="w-fit h-fit">
        <Avatar className="w-[100px] h-[100px]">
          <AvatarImage
            src={
              avatarUrl ||
              "/placeholder.svg?height=100&width=100&query=student avatar" ||
              "/placeholder.svg"
            }
            alt={`Avatar of ${name}`}
          />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-row gap-4 md:gap-[48px] w-full h-full">
        <div className="flex flex-col w-full h-full">
          <h1 className="lg:text-base text-xs text-gray">Name</h1>
          <h1 className="lg:text-xl text-sm font-medium">{name}</h1>
        </div>
        <div className="flex flex-col w-full h-full">
          <h1 className="lg:text-base text-xs text-gray">StudentID/Email</h1>
          <h1 className="lg:text-xl text-sm font-medium">{email}</h1>
        </div>
        <div>
          <Button>Edit</Button>
          {/* TODO:add modal with graduating year and roll
          number, refractor entire page
          */}
        </div>
      </div>
    </div>
  );
};

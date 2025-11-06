import React, { useState } from "react";
import { Button } from "@/core/presentation/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/core/presentation/components/ui/avatar";
import { useAvatarFallback } from "../../hooks/useAvatarFallback";
import { EditProfileModal } from "./EditProfileModal";
import { useToast } from "@/core/hooks/useToast";
import { updateUser } from "@/modules/Librarian/Users/application/userUseCase";
import { UserRequest } from "@/modules/Librarian/Users/domain/entities/UserEntity";

interface ProfileHeaderProps {
  name: string;
  email: string;
  uuid?: string;
  userMedatadata: any;
  avatarUrl?: string;
  avatarFallBack?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  uuid,
  name,
  userMedatadata,
  email,
  avatarUrl,
  avatarFallBack,
}) => {
  const fallback = useAvatarFallback(name, avatarFallBack);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rollNumber, setRollNumber] = useState("");
  const [graduatingYear, setGraduatingYear] = useState("");
  const updateUserMutation = updateUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: UserRequest = {
      uuid: uuid,
      name: name,
      roll_number: rollNumber,
      email,
      graduating_year: graduatingYear,
      role: "STUDENT",
      user_metadata: userMedatadata || { additionalProp1: "" },
    };

    if (!rollNumber.trim() || !graduatingYear.trim()) {
      useToast("error", "Please fill in both Roll Number and Graduation Year.");
      return;
    }

    try {
      updateUserMutation.mutateAsync(payload, {
        onSuccess: () => {
          useToast("success", "Profile details saved.");
          setIsModalOpen(false);
        },
        onError: (error: any) => {
          useToast("error", error.message);
        },
      });

      setIsModalOpen(false);
    } catch (error) {
      useToast("error", `Error updating profile details : ${error}`);
    }
  };

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
          <Button onClick={() => setIsModalOpen(true)}>Edit</Button>
        </div>
      </div>
      <EditProfileModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        rollNumber={rollNumber}
        onRollNumberChange={setRollNumber}
        graduatingYear={graduatingYear}
        onGraduatingYearChange={setGraduatingYear}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

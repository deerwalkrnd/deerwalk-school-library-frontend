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
    <div className="flex flex-col w-full max-w-[489px] mx-auto md:m-8 gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
        <div className="w-fit h-fit">
          <Avatar className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]">
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
        <div className="flex-1 w-full sm:w-auto">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto sm:ml-auto"
          >
            Edit
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col w-full">
          <h1 className="text-xs md:text-base text-gray">Name</h1>
          <h1 className="text-sm md:text-xl font-medium break-words">{name}</h1>
        </div>
        <div className="flex flex-col w-full">
          <h1 className="text-xs md:text-base text-gray">StudentID/Email</h1>
          <h1 className="text-sm md:text-xl font-medium break-words">
            {email}
          </h1>
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

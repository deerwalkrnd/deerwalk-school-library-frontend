"use client";

import { useState, useEffect } from "react";
import { CircleX } from "lucide-react";
import { UserRequest } from "../../domain/entities/UserEntity";
// import { useGetUserById, useUpdateUser } from "../../application/userUseCase";
import { useToast } from "@/core/hooks/useToast";
import { User } from "@/modules/Authentication/domain/entities/userEntity";
import { updateUser } from "../../application/userUseCase";
import { Input } from "@/core/presentation/components/ui/input";

interface EditUsersModalProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditUserModal({
  user,
  open,
  onOpenChange,
}: EditUsersModalProps) {
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

  const [rollNo, setRollNo] = useState<string>("");
  const [studentName, setStudentName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [graduatingyear, setGraduatingYear] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const mutation = updateUser();

  useEffect(() => {
    if (open) {
      setShowModal(true);
      setAnimationClass("animate-slide-down");
      document.body.style.overflow = "hidden";

      if (user) {
        setStudentName(user.name ?? "");
        setRollNo(user.roll_number ?? "");
        setEmail(user.email ?? "");
        setGraduatingYear(user.graduating_year ?? "");
        setPassword("");
      }
    } else {
      setAnimationClass("animate-slide-up");
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const handleAnimationEnd = () => {
    if (!open) setShowModal(false);
  };

  if (!showModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: UserRequest = {
      uuid: user.uuid,
      name: studentName,
      roll_number: rollNo,
      email,
      password: password || undefined,
      graduating_year: graduatingyear,
      role: "STUDENT",
      user_metadata: user.user_metadata || { additionalProp1: "" },
    };

    mutation.mutate(payload, {
      onSuccess: () => {
        useToast("success", "User updated successfully");
        onOpenChange(false);
      },
      onError: (error: any) => {
        useToast("error", error.message);
      },
    });
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 md:left-64 z-50 flex items-center justify-center">
      <div
        className={`relative bg-white rounded-lg shadow-xl w-210 overflow-y-auto no-scrollbar ${animationClass}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="flex items-center justify-center p-6 pb-0 border-gray-200">
          <h2 className="text-2xl font-semibold text-black flex items-center">
            Edit Student
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 absolute right-6 hover:text-gray-600"
          >
            <CircleX className="h-6 w-6 text-black cursor-pointer" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-10 space-y-6 w-210">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="studentName"
                className="block text-sm font-medium text-black"
              >
                Student Name
              </label>
              <input
                id="studentName"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student name"
                className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="rollNumber"
                className="block text-sm font-medium text-black"
              >
                Roll Number
              </label>
              <input
                type="number"
                value={rollNo}
                id="rollNumber"
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="Enter roll number"
                className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="graduationYear"
                className="block text-sm font-medium text-black"
              >
                Graduation Year
              </label>
              <Input
                id="graduationYear"
                placeholder="Enter Graduation year"
                value={graduatingyear}
                onChange={(e) => setGraduatingYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password (leave blank to keep current)
              </label>
              <input
                type="password"
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-6 pb-10">
            <button
              type="submit"
              className="px-6 py-2 button-border rounded-sm text-sm font-medium cursor-pointer w-36"
            >
              {mutation.isPending ? "Updating..." : "Update User"}
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-6 py-2 border border-gray-300 rounded-sm text-sm font-semibold text-black bg-white w-30"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

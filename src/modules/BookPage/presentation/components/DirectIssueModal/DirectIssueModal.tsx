"use client";

import { useEffect, useMemo, useState } from "react";
import { CircleX, Search, ChevronDown } from "lucide-react";
import { useToast } from "@/core/hooks/useToast";
import { useBorrowBook } from "@/modules/BorrowReserve/application/BorrowUseCase";
import { getUsers } from "@/modules/Librarian/Users/application/userUseCase";
import { getAvailableCopies } from "@/modules/BookPage/application/bookUseCase";
import { BorrowRequest } from "@/modules/BorrowReserve/domain/entities/BorrowEntity";
import { UserResponse } from "@/modules/Librarian/Users/domain/entities/UserEntity";
import { BookCopy } from "@/modules/BookPage/domain/entities/bookModal";

interface DirectIssueModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookId: number;
  bookTitle: string;
}

const getDefaultDueDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 14);
  return date.toISOString().split("T")[0];
};

export function DirectIssueModal({
  open,
  onOpenChange,
  bookId,
  bookTitle,
}: DirectIssueModalProps) {
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const [selectedCopy, setSelectedCopy] = useState<BookCopy | null>(null);
  const [isCopyDropdownOpen, setIsCopyDropdownOpen] = useState(false);

  const [renewableTimes, setRenewableTimes] = useState<string>("2");
  const [dueDate, setDueDate] = useState<string>(getDefaultDueDate());
  const [enableFine, setEnableFine] = useState<boolean>(false);

  const { data: usersData, isLoading: isLoadingUsers } = getUsers({
    page: 1,
    limit: 10,
    searchable_value: userSearchQuery,
  });

  const { data: copiesData, isLoading: isLoadingCopies } = getAvailableCopies({
    book_id: bookId,
  });

  const borrowMutation = useBorrowBook();
  const toast = useToast;

  useEffect(() => {
    if (open) {
      setShowModal(true);
      setAnimationClass("animate-slide-down");
      document.body.style.overflow = "hidden";
    } else {
      setAnimationClass("animate-slide-up");
      resetForm();
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const handleAnimationEnd = () => {
    if (!open) setShowModal(false);
  };

  const resetForm = () => {
    setUserSearchQuery("");
    setSelectedUser(null);
    setSelectedCopy(null);
    setRenewableTimes("2");
    setDueDate(getDefaultDueDate());
    setEnableFine(false);
    setIsUserDropdownOpen(false);
    setIsCopyDropdownOpen(false);
  };

  const formError = useMemo(() => {
    if (!selectedUser) return "Please select a student.";
    if (!selectedCopy) return "Please select a book copy.";
    const r = Number(renewableTimes);
    if (Number.isNaN(r) || r <= 1 || r >= 4)
      return "Renewable times must be 2 or 3.";
    const d = new Date(dueDate);
    if (Number.isNaN(d.getTime())) return "Due date is invalid.";
    return "";
  }, [selectedUser, selectedCopy, renewableTimes, dueDate]);

  if (!showModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formError) {
      toast("error", formError);
      return;
    }

    const payload: BorrowRequest = {
      times_renewable: Number(renewableTimes),
      due_date: dueDate,
      fine_enabled: enableFine,
      user_uuid: selectedUser!.uuid,
    };

    borrowMutation.mutate(
      { id: selectedCopy!.id, bookId: bookId, payload },
      {
        onSuccess: () => {
          toast("success", "Book issued successfully");
          resetForm();
          onOpenChange(false);
        },
        onError: (error: any) => {
          toast("error", error?.message ?? "Failed to issue book");
        },
      },
    );
  };

  const handleUserSelect = (user: UserResponse) => {
    setSelectedUser(user);
    setUserSearchQuery("");
    setIsUserDropdownOpen(false);
  };

  const handleCopySelect = (copy: BookCopy) => {
    setSelectedCopy(copy);
    setIsCopyDropdownOpen(false);
  };

  const availableCopies =
    copiesData?.items?.filter((copy: BookCopy) => copy.is_available) || [];

  const users = usersData?.items || [];

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 md:left-64 z-50 flex items-center justify-center bg-black/30">
      <div
        className={`relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-y-auto no-scrollbar max-h-[90vh] ${animationClass}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="flex items-center justify-center p-6 pb-0 border-gray-200">
          <h2 className="text-2xl font-semibold text-black flex items-center">
            Issue Book
          </h2>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-gray-400 absolute right-6 hover:text-gray-600"
          >
            <CircleX className="h-6 w-6 text-black cursor-pointer" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="bookTitle"
              className="block text-sm font-medium text-black"
            >
              Book Title
            </label>
            <input
              id="bookTitle"
              value={bookTitle}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-gray-100 text-gray-600 text-sm font-medium"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="studentSearch"
              className="block text-sm font-medium text-black"
            >
              Select Student <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              {selectedUser ? (
                <div className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-sm bg-primary/5">
                  <span className="text-sm font-medium">
                    {selectedUser.name} ({selectedUser.roll_number})
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedUser(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <CircleX className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      id="studentSearch"
                      type="text"
                      value={userSearchQuery}
                      onChange={(e) => {
                        setUserSearchQuery(e.target.value);
                        setIsUserDropdownOpen(true);
                      }}
                      onFocus={() => setIsUserDropdownOpen(true)}
                      placeholder="Search by name, roll number, or email..."
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-sm font-medium"
                    />
                  </div>
                  {isUserDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-sm shadow-lg max-h-48 overflow-y-auto">
                      {isLoadingUsers ? (
                        <div className="px-3 py-2 text-sm text-gray-500">
                          Loading...
                        </div>
                      ) : users.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-gray-500">
                          {userSearchQuery
                            ? "No students found"
                            : "Type to search students"}
                        </div>
                      ) : (
                        users.map((user: UserResponse) => (
                          <button
                            key={user.uuid}
                            type="button"
                            onClick={() => handleUserSelect(user)}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-gray-500">
                              {user.roll_number} • {user.email}
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="bookCopy"
              className="block text-sm font-medium text-black"
            >
              Select Book Copy <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCopyDropdownOpen(!isCopyDropdownOpen)}
                className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-sm font-medium"
              >
                <span className={selectedCopy ? "text-black" : "text-gray-400"}>
                  {selectedCopy
                    ? `Copy #${selectedCopy.id} - ${selectedCopy.unique_identifier || "N/A"} (${selectedCopy.condition || "Good"})`
                    : "Select a book copy"}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
              {isCopyDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-sm shadow-lg max-h-48 overflow-y-auto">
                  {isLoadingCopies ? (
                    <div className="px-3 py-2 text-sm text-gray-500">
                      Loading...
                    </div>
                  ) : availableCopies.length === 0 ? (
                    <div className="px-3 py-2 text-sm text-gray-500">
                      No available copies
                    </div>
                  ) : (
                    availableCopies.map((copy: BookCopy) => (
                      <button
                        key={copy.id}
                        type="button"
                        onClick={() => handleCopySelect(copy)}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium">Copy #{copy.id}</div>
                        <div className="text-xs text-gray-500">
                          ID: {copy.unique_identifier || "N/A"} • Condition:{" "}
                          {copy.condition || "Good"}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="renewableTimes"
                className="block text-sm font-medium text-black"
              >
                Times Renewable{" "}
                <span className="text-xs text-gray-500">(2-3)</span>
              </label>
              <input
                id="renewableTimes"
                type="number"
                min={2}
                max={3}
                value={renewableTimes}
                onChange={(e) => setRenewableTimes(e.target.value)}
                placeholder="e.g., 2"
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-sm font-medium"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-black"
              >
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-sm font-medium"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <input
              id="enableFine"
              type="checkbox"
              checked={enableFine}
              onChange={(e) => setEnableFine(e.target.checked)}
              className="h-4 w-4"
            />
            <label
              htmlFor="enableFine"
              className="text-sm font-medium text-black"
            >
              Enable Fine
            </label>
          </div>
          <div className="flex gap-3 pt-6 pb-4">
            <button
              type="submit"
              disabled={borrowMutation.isPending}
              className="px-6 py-2 button-border rounded-sm text-sm font-medium cursor-pointer w-30 disabled:opacity-70"
            >
              {borrowMutation.isPending ? "Issuing..." : "Issue"}
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

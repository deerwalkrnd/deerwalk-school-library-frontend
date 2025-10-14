import { useAuth } from "@/core/presentation/contexts/AuthContext";
import { Button } from "@/core/presentation/components/ui/button";
import { Input } from "@/core/presentation/components/ui/input";
import { useToast } from "@/core/hooks/useToast";
import { useCreateReview } from "@/modules/Reviews/application/ReviewUseCase";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";

interface ReviewFormProps {
  bookId: string;
}

const ReviewForm = ({ bookId }: ReviewFormProps) => {
  const [input, setInput] = useState("");
  const { user } = useAuth();
  const createReviewMutation = useCreateReview();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) {
      useToast("error", "Please enter a review");
      return;
    }

    if (!user) {
      useToast("error", "You must be logged in to submit a review");
      return;
    }

    try {
      await createReviewMutation.mutateAsync({
        book_id: parseInt(bookId),
        user_id: user.uuid,
        review_text: input.trim(),
        is_spam: false,
      });

      useToast("success", "Review submitted successfully!");

      setInput("");
    } catch (error: any) {
      useToast("error", error?.message || "Failed to submit review");
    }
  };

  const getUserInitials = () => {
    if (user?.name) {
      return user.name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    return "U";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row gap-2 justify-center items-center"
    >
      <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
        {user?.image_url ? (
          <img
            src={user.image_url}
            alt={user.name || "User"}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          getUserInitials()
        )}
      </div>
      <div className="flex-1 flex gap-2">
        <Input
          type="text"
          placeholder="Add a review..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-0 border-b border-gray-300 focus:border-black focus:ring-0 rounded-none shadow-none placeholder-gray-400"
          disabled={createReviewMutation.isPending}
        />
        <Button
          type="submit"
          size="sm"
          disabled={!input.trim() || createReviewMutation.isPending}
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md disabled:opacity-50"
        >
          {createReviewMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Posting...
            </>
          ) : (
            "Post"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;

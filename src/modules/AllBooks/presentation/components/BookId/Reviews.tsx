import ReviewList from "@/modules/Reviews/presentation/components/ReviewsList";
import React from "react";
import ReviewForm from "./ReviewForm";

const Reviews = ({ id }: { id: string }) => {
  return (
    <div className="mt-4">
      <h1 className="font-semibold text-xl text-gray-900 mb-2">
        Reviews for this book
      </h1>
      <ReviewForm bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
};

export default Reviews;

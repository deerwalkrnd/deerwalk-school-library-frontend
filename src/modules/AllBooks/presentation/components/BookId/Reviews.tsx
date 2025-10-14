import ReviewList from "@/modules/Reviews/presentation/components/ReviewsList";
import React from "react";
import ReviewForm from "./ReviewForm";

const Reviews = () => {
  return (
    <div className="mt-4">
      <h1 className="font-semibold text-xl text-gray-900 mb-2">
        Reviews for this book
      </h1>
      <ReviewForm />
      <ReviewList />
    </div>
  );
};

export default Reviews;

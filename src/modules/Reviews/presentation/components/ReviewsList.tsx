import React from "react";
import { reviewData } from "../../data/reviewData";
import { MoreVertical } from "lucide-react";

const ReviewList = () => {
  return (
    <div className="space-y-6 mt-10">
      {reviewData.map((review) => (
        <div key={review.id} className="flex gap-3">
          {review.avatar ? (
            <img
              src={review.avatar}
              alt={review.username}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
              {review.username.substring(1, 3).toUpperCase()}
            </div>
          )}
          <div className="flex-1 border-b border-gray-200 pb-4">
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium">{review.username}</p>
              <MoreVertical className="w-4 h-4 text-gray-500 cursor-pointer" />
            </div>
            <p className="text-sm text-gray--700 mt-1">{review.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;

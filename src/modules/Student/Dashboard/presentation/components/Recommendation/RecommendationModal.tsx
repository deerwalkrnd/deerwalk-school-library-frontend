"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/core/presentation/components/Button/Button";
import { getRecommendations } from "@/modules/Announcement/Recommendation/application/recommendationUseCase";
import { TeachersRecommendationSkeleton } from "./RecommendationSkeleton";

const TeachersRecommendation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isLoading, isError, error } = getRecommendations();

  if (isLoading) {
    return <TeachersRecommendationSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
            Teacher's Recommendation
          </h1>
          <h2 className="text-sm font-medium">
            Explore books personally recommended by our faculty.
          </h2>
        </div>
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center">
          <div className="text-red-600 mb-2">⚠️</div>
          <h3 className="text-lg font-semibold mb-2">
            Unable to load recommendations
          </h3>
          <p className="text-gray-600">
            {error?.message ||
              "Something went wrong while fetching recommendations. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  // Show empty state if no data or no items
  if (!data || !data.items || data.items.length === 0) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
            Teacher's Recommendation
          </h1>
          <h2 className="text-sm font-medium">
            Explore books personally recommended by our faculty.
          </h2>
        </div>
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-lg font-semibold mb-2">
            No recommendations available
          </h3>
          <p className="text-gray-600">
            Check back later for personalized book recommendations from our
            faculty.
          </p>
        </div>
      </div>
    );
  }

  const transformRecommendation = (apiItem: any) => ({
    id: apiItem.id,
    name: apiItem.name,
    title: apiItem.designation,
    image: "/placeholder.png",
    quote: apiItem.note,
    bookTitle: apiItem.book_title,
    bookCover:
      apiItem.cover_image_url && apiItem.cover_image_url.trim() !== ""
        ? apiItem.cover_image_url
        : "/placeholder.png",
  });

  const recommendations = data?.items?.map(transformRecommendation) || [];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentRecommendation = recommendations![currentIndex];

  return (
    <div className="flex flex-col gap-8 ">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
          Teacher's Recommendation
        </h1>
        <h2 className="text-sm  font-medium">
          Explore books personally recommended by our faculty.
        </h2>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden p-8 md:p-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-25">
          <div className="flex flex-col items-center gap-5 flex-shrink-0">
            <div className="w-56 h-56 rounded-full overflow-hidden shadow-lg">
              <img
                src={currentRecommendation.image}
                alt={currentRecommendation.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center flex flex-col gap-1">
              <h3 className="text-xl font-semibold">
                {currentRecommendation.name}
              </h3>
              <p className="font-medium">{currentRecommendation.title}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-8 flex-1">
            <div className="flex flex-col gap-8 flex-1">
              <blockquote className="italic font-medium ">
                "{currentRecommendation.quote}"
              </blockquote>

              <div className="flex flex-col gap-3 items-start">
                <p className="text-sm font-medium ">Recommended Book:</p>
                <h4 className="text-lg font-semibold ">
                  {currentRecommendation.bookTitle}
                </h4>
                {/* <Button className=" text-white rounded-sm ">View Book</Button> */}
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl flex-shrink-0">
              <div className="bg-white w-48 h-72 px-8 py-5">
                <img
                  src={currentRecommendation.bookCover}
                  alt={currentRecommendation.bookTitle}
                  className="w-full h-full object-cover "
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center mt-8 gap-2">
          {recommendations.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full ring-1 ring-primary transition-colors duration-200 ${
                index === currentIndex && "bg-primary"
              }`}
              aria-label={`Go to recommendation ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeachersRecommendation;

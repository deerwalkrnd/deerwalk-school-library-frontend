"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/core/presentation/components/Button/Button";

const TeachersRecommendation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const recommendations = [
    {
      id: 1,
      name: "John Doe",
      title: "Principal",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote:
        "Lorem ipsum dolor sit amet consectetur. Mattis arcu consectetur pretium consequat velit ut in. Aliquam diam phasellus quis non. Condimentum aliquet est rhoncus pretium pellentesque hendrerit. Est congue et cursus elit mi rhoncus.",
      bookTitle: "The Fault in Our Stars",
      bookCover:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "English Teacher",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.",
      bookTitle: "To Kill a Mockingbird",
      bookCover:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Michael Chen",
      title: "Science Teacher",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate.",
      bookTitle: "Sapiens",
      bookCover:
        "https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      title: "History Teacher",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam.",
      bookTitle: "1984",
      bookCover:
        "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=200&h=300&fit=crop",
    },
  ];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentRecommendation = recommendations[currentIndex];

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

      <div className="bg-white rounded-2xl  overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-9">
              <div className="flex flex-col items-center gap-5">
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
              <div className="flex flex-col gap-8">
                <blockquote className="italic font-medium ">
                  "{currentRecommendation.quote}"
                </blockquote>

                <div className="flex flex-row justify-between w-full gap-3">
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-medium ">Recommended Book:</p>
                    <h4 className="text-lg font-semibold ">
                      {currentRecommendation.bookTitle}
                    </h4>
                    <Button className=" text-white rounded-sm ">
                      View Book
                    </Button>
                  </div>
                  <div className=" rounded-lg overflow-hidden shadow-xl ">
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
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-6  ">
          <div className="flex items-center justify-center w-full gap-2">
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
    </div>
  );
};

export default TeachersRecommendation;

"use client";
import React, { useState } from "react";
import { Button } from "@/core/presentation/components/ui/button";
import Quotes from "@/modules/Announcement/Quotes/presentation/components/Quote";
import Events from "@/modules/Announcement/Events/presentation/components/Event";
import TeacherRecommendation from "@/modules/Announcement/Recommendation/presentation/components/Recommendation";
import { cn } from "@/core/lib/utils";

const AnnouncementsPage = () => {
  const [activeTab, setActiveTab] = useState<
    "recommendation" | "event" | "quote"
  >("recommendation");

  const renderTabContent = () => {
    switch (activeTab) {
      case "recommendation":
        return <TeacherRecommendation />;
      case "event":
        return <Events />;
      case "quote":
        return <Quotes />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-15 px-6 md:px-15 lg:px-25 py-10 w-full">
      <div>
        <div className="font-semibold text-3xl">Annoucements</div>
        <div className="font-medium text-base text-gray mt-2">
          Recommend Reads, Highlight New Arrivals & Post Events!
        </div>
      </div>
      <div className="flex justify-between items-center border-b pb-6 px-14">
        <Button
          variant="ghost"
          onClick={() => setActiveTab("recommendation")}
          className={cn(
            "w-32 md:w-40 lg:w-60 h-14 border-2 border-transparent font-semibold text-black text-sm md:text-base rounded-md transition-all",
            activeTab === "recommendation"
              ? "border-primary bg-light hover:bg-light"
              : "hover:bg-gray-100",
          )}
        >
          Teacher's Recommendation
        </Button>

        <Button
          variant="ghost"
          onClick={() => setActiveTab("event")}
          className={cn(
            "w-32 md:w-40 lg:w-48 h-14 border-2 border-transparent font-semibold text-black text-sm md:text-base rounded-md transition-all",
            activeTab === "event"
              ? "border-primary bg-light hover:bg-light"
              : "hover:bg-gray-100",
          )}
        >
          Add Events
        </Button>

        <Button
          variant="ghost"
          onClick={() => setActiveTab("quote")}
          className={cn(
            "w-32 md:w-40 lg:w-48 h-14 border-2 border-transparent font-semibold text-black text-sm md:text-base rounded-md transition-all",
            activeTab === "quote"
              ? "border-primary bg-light hover:bg-light"
              : "hover:bg-gray-100",
          )}
        >
          Add quote
        </Button>
      </div>
      <div className="w-full">{renderTabContent()}</div>
    </div>
  );
};

export default AnnouncementsPage;

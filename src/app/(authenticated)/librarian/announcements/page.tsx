"use client";
import React, { useState } from "react";
import { Button } from "@/core/presentation/components/ui/button";
import { Quotes } from "@/modules/Announcement/Quotes/presentation/components/QuoteTable";
import { Events } from "@/modules/Announcement/Events/presentation/components/EventTable";
import { TeacherRecommendation } from "@/modules/Announcement/Recommendation/presentation/components/RecommendationTable";

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
        <button
          onClick={() => setActiveTab("recommendation")}
          style={
            activeTab === "recommendation"
              ? { backgroundColor: "var(--lightorange)" }
              : {}
          }
          className={`px-6 py-2 text-lg font-semibold rounded-md border transition ${
            activeTab === "recommendation"
              ? "border-[#EA5D0E] text-black"
              : "border border-transparent hover:bg-gray-50 text-black"
          }`}
        >
          Teacher’s Recommendation
        </button>
        <button
          onClick={() => setActiveTab("event")}
          style={
            activeTab === "event"
              ? { backgroundColor: "var(--lightorange)" }
              : {}
          }
          className={`px-6 py-2 text-lg font-semibold rounded-md border transition ${
            activeTab === "event"
              ? "border-[#EA5D0E] text-black"
              : "border border-transparent hover:bg-gray-50 text-black"
          }`}
        >
          Add Event
        </button>

        <button
          onClick={() => setActiveTab("quote")}
          style={
            activeTab === "quote"
              ? { backgroundColor: "var(--lightorange)" }
              : {}
          }
          className={`px-6 py-2 text-lg font-semibold rounded-md border transition ${
            activeTab === "quote"
              ? "border-[#EA5D0E] text-black"
              : "border border-transparent hover:bg-gray-50 text-black"
          }`}
        >
          Add Quote
        </button>
      </div>
      <div className="w-full">{renderTabContent()}</div>
    </div>
  );
};

export default AnnouncementsPage;

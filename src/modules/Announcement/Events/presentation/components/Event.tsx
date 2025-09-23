"use client";
import React, { useState } from "react";
// import FeedbackTable from "./FeedbackTable";
import { CirclePlus, Search } from "lucide-react";
import { Input } from "@/core/presentation/components/ui/input";
import DatePicker from "@/core/presentation/components/date-picker/date-picker";
import { Label } from "@/core/presentation/components/ui/label";
import { Button as ApplyButton } from "@/core/presentation/components/ui/button";
import { cn } from "@/core/lib/utils";
import Button from "@/core/presentation/components/Button/Button";
import { AddEventModal } from "@/modules/AnnouncementModals/presentation/components/AddEvent";

const TeacherRecommendation = () => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      search,
      startDate,
      endDate,
    });
  };

  return (
    <div className="flex flex-col gap-12">
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="relative flex flex-row items-center">
              <Search className="absolute left-2 text-gray-400" size={18} />
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-4 py-5 placeholder:text-sm placeholder:text-gray-400 w-96"
                placeholder="Search using name..."
              />
            </div>

            <Button
              onClick={() => setIsAddEventOpen(true)}
              className={cn(
                "ml-auto flex items-center justify-center gap-1.5 h-9",
                "text-sm leading-none tracking-tight text-shadow-sm",
              )}
            >
              <CirclePlus className="w-4 h-4" />
              Add Event
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-5 lg:items-end items-start">
            <div className="flex flex-col gap-2">
              <Label>Start Date</Label>
              <DatePicker selected={startDate} onSelect={setStartDate} />
            </div>

            <div className="flex flex-col gap-2">
              <Label>End Date</Label>
              <DatePicker selected={endDate} onSelect={setEndDate} />
            </div>

            <ApplyButton
              type="submit"
              className="bg-white hover:bg-gray-50 text-black font-bold shadow-md px-12 border"
            >
              Apply
            </ApplyButton>
          </div>
        </form>
      </div>

      <AddEventModal
        open={isAddEventOpen}
        onOpenChange={(open) => setIsAddEventOpen(open)}
      />

      {/* <FeedbackTable /> */}
    </div>
  );
};

export default TeacherRecommendation;

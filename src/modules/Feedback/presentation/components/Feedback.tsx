"use client";
import React, { useState } from "react";
import FeedbackTable from "./FeedbackTable";
import { Search } from "lucide-react";
import { Input } from "@/core/presentation/components/ui/input";
import DatePicker from "@/core/presentation/components/date-picker/date-picker";
import { Label } from "@/core/presentation/components/ui/label";
import { Button } from "@/core/presentation/components/ui/button";

const Feedback = () => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

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
          <div className="relative flex flex-row items-center">
            <Search className="absolute left-2 text-gray-400" size={18} />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-4 py-5 placeholder:text-sm placeholder:text-gray-400"
              placeholder="Search using Student Name"
            />
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

            <Button
              type="submit"
              className="bg-white hover:bg-gray-50 text-black font-bold shadow-md px-12 border"
            >
              Apply
            </Button>
          </div>
        </form>
      </div>

      <FeedbackTable />
    </div>
  );
};

export default Feedback;

"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/core/presentation/components/ui/button";
import { Calendar } from "@/core/presentation/components/ui/calendar";
import { Input } from "@/core/presentation/components/ui/input";
import { Label } from "@/core/presentation/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/presentation/components/ui/popover";
import { read } from "fs";

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) return false;
  return !isNaN(date.getTime());
}

export function Calendar28() {
  const [openStart, setOpenStart] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    new Date("2025-06-01"),
  );
  const [monthStart, setMonthStart] = React.useState<Date | undefined>(
    startDate,
  );
  const [valueStart, setValueStart] = React.useState(formatDate(startDate));

  const [openEnd, setOpenEnd] = React.useState(false);
  const [endDate, setEndDate] = React.useState<Date | undefined>(
    new Date("2025-06-10"),
  );
  const [monthEnd, setMonthEnd] = React.useState<Date | undefined>(endDate);
  const [valueEnd, setValueEnd] = React.useState(formatDate(endDate));

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date" className="px-1">
          Start Date
        </Label>
        <div className="relative flex gap-2">
          <Input
            id="date"
            value={valueStart}
            placeholder="June 01, 2025"
            className="bg-background pr-10"
            onChange={(e) => {
              const date = new Date(e.target.value);
              setValueStart(e.target.value);
              if (isValidDate(date)) {
                setStartDate(date);
                setMonthStart(date);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setOpenStart(true);
              }
            }}
          />
          <Popover open={openStart} onOpenChange={setOpenStart}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              >
                <CalendarIcon className="size-3.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={startDate}
                captionLayout="dropdown"
                month={monthStart}
                onMonthChange={setMonthStart}
                onSelect={(date) => {
                  setStartDate(date);
                  setValueStart(formatDate(date));
                  setOpenStart(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="end-date" className="px-1">
          End Date
        </Label>
        <div className="relative flex gap-2">
          <Input
            id="end-date"
            value={valueEnd}
            placeholder="June 10, 2025"
            className="bg-background pr-10"
            onChange={(e) => {
              const date = new Date(e.target.value);
              setValueEnd(e.target.value);
              if (isValidDate(date)) {
                setEndDate(date);
                setMonthEnd(date);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setOpenEnd(true);
              }
            }}
          />
          <Popover open={openEnd} onOpenChange={setOpenEnd}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              >
                <CalendarIcon className="size-3.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={endDate}
                captionLayout="dropdown"
                month={monthEnd}
                onMonthChange={setMonthEnd}
                onSelect={(date) => {
                  setEndDate(date);
                  setValueEnd(formatDate(date));
                  setOpenEnd(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
